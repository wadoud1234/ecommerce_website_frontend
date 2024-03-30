import { init, isCuid } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
	varchar,
	pgTable,
	boolean,
	text,
	pgEnum,
	timestamp,
	integer,
	decimal,
	real,
	primaryKey,
} from "drizzle-orm/pg-core";

export const generateDatabaseId = (length = 40): string => {
	const generate = init({ length });
	return generate();
};

export const isValidDatabaseId = (id: string) => {
	return isCuid(id);
};

export const providers = pgEnum("providers", ["github", "email"]);
export const linkProviders = pgEnum("linkProviders", [
	"google",
	"facebook",
	"instagram",
	"whats_up",
	"apple",
	"ali_baba",
	"ali_express",
	"twitter",
	"github",
	"personal",
]);

// USERS
export const userModel = pgTable("user", {
	id: varchar("id", { length: 50 })
		.$default(() => generateDatabaseId())
		.primaryKey(),
	name: varchar("name", { length: 255 }).unique().notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	searchText: text("searchText").notNull(),

	email: varchar("email", { length: 255 }).unique().notNull(),
	emailVerified: boolean("emailVerified").default(false).notNull(),

	avatar: text("avatar").default("").notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	description: text("description").default("").notNull(),
	isAdmin: boolean("isAdmin").default(false).notNull(),

	provider: providers("provider").notNull(),
	providerId: varchar("providerId", { length: 255 }).notNull(),

	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
	// sessions links products cart orders
});

export const userRelations = relations(userModel, ({ many, one }) => ({
	sessions: many(sessionModel),
	links: many(userLinksModel),
	products: many(productModel),
	cart: one(cartModel),
}));

// SESSIONS
export const sessionModel = pgTable("session", {
	id: varchar("id", { length: 50 })
		// .$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	userId: varchar("user_id", { length: 50 })
		.references(() => userModel.id, { onDelete: "cascade" })
		.notNull(),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const sessionRelations = relations(sessionModel, ({ one }) => ({
	user: one(userModel, {
		fields: [sessionModel.userId],
		references: [userModel.id],
	}),
}));
// PRODUCTS
export const productStatus = pgEnum("status", [
	"active",
	"out of stock",
	"disactivated",
]);
export const productModel = pgTable("product", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	searchText: text("searchText").notNull(),
	description: text("description").notNull(),
	price: real("price").notNull(),
	likes: integer("likes").default(0).notNull(),
	rating: real("rating").default(0).notNull(),
	quantity: integer("quantity").notNull(),
	sold: integer("sold").default(0).notNull(),
	mainImage: varchar("mainImage", { length: 255 }).notNull(),
	status: productStatus("productStatus").default("active").notNull(),

	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),

	userId: varchar("userId", { length: 50 })
		.notNull()
		.references(() => userModel.id, { onDelete: "cascade" }),

	categoryId: varchar("categoryId", { length: 50 })
		.notNull()
		.references(() => categoryModel.id, { onDelete: "cascade" }),
});

export const productRelations = relations(productModel, ({ many, one }) => ({
	users: one(userModel, {
		fields: [productModel.userId],
		references: [userModel.id],
	}),
	images: one(productImagesModel),
	orderItems: many(orderItemModel),
	cartItems: many(cartItemModel),
	category: one(categoryModel, {
		fields: [productModel.categoryId],
		references: [categoryModel.id],
	}),
}));

// PRODUCT IMAGES
export const productImagesModel = pgTable("productImages", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	picture1: varchar("picture1", { length: 255 }).default("").notNull(),
	picture2: varchar("picture2", { length: 255 }).default("").notNull(),
	picture3: varchar("picture3", { length: 255 }).default("").notNull(),

	productId: varchar("productId", { length: 50 }).notNull(),
});

export const productImagesRelations = relations(
	productImagesModel,
	({ one }) => ({
		product: one(productModel, {
			fields: [productImagesModel.productId],
			references: [productModel.id],
		}),
	}),
);
// LINKS
export const userLinksModel = pgTable("userLinks", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	link: varchar("link", { length: 255 }).notNull(),
	provider: linkProviders("provider").notNull().default("personal"),

	userId: varchar("userId", { length: 50 })
		.references(() => userModel.id, { onDelete: "cascade" })
		.notNull(),
});

export const userLinksRelations = relations(userLinksModel, ({ one }) => ({
	user: one(userModel, {
		fields: [userLinksModel.userId],
		references: [userModel.id],
	}),
}));

// CATEGORIES
export const categoryModel = pgTable("category", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	name: varchar("name", { length: 200 }).unique().notNull(),
	slug: varchar("slug", { length: 255 }).unique().notNull(),

	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const categoryRelations = relations(categoryModel, ({ many }) => ({
	products: many(productModel),
}));

// CART ITEMS
export const cartItemModel = pgTable(
	"cartItem",
	{
		cartId: varchar("cartId", { length: 50 })
			.references(() => cartModel.id, { onDelete: "cascade" })
			.notNull(),
		// createdAt: timestamp("createdAt").defaultNow().notNull(),
		productId: varchar("productId", { length: 50 })
			.references(() => productModel.id, { onDelete: "cascade" })
			.notNull(),
		// quantity: varchar("quantity", { length: 255 }).notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.cartId, t.productId] }),
	}),
);

export const cartItemRelations = relations(cartItemModel, ({ one }) => ({
	cart: one(cartModel, {
		fields: [cartItemModel.cartId],
		references: [cartModel.id],
	}),
	product: one(productModel, {
		fields: [cartItemModel.productId],
		references: [productModel.id],
	}),
}));

// CART
export const cartModel = pgTable("cart", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	userId: varchar("userId", { length: 50 }).notNull(),
});

export const cartRelations = relations(cartModel, ({ many, one }) => ({
	cartItems: many(cartItemModel),
	user: one(userModel, {
		fields: [cartModel.userId],
		references: [userModel.id],
	}),
}));

// ORDER ITEMS
export const orderItemModel = pgTable(
	"orderItem",
	{
		orderId: varchar("orderId", { length: 50 }).notNull(),
		productId: varchar("productId", { length: 50 }).notNull(),
		quantity: varchar("quantity", { length: 255 }).notNull(),
		createdAt: timestamp("createdAt").defaultNow().notNull(),
		updatedAt: timestamp("updatedAt").defaultNow().notNull(),
	},
	(t) => ({ pk: primaryKey({ columns: [t.orderId, t.productId] }) }),
);
export const orderItemRelations = relations(orderItemModel, ({ one }) => ({
	order: one(orderModel, {
		fields: [orderItemModel.orderId],
		references: [orderModel.id],
	}),
	product: one(productModel, {
		fields: [orderItemModel.productId],
		references: [productModel.id],
	}),
}));

// ORDERS
export const orderModel = pgTable("order", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	userId: varchar("userId", { length: 50 }).notNull(),
	products: varchar("products", { length: 255 }).notNull(),
	total: varchar("total", { length: 255 }).notNull(),
	// orderItems products users
});
export const orderRelations = relations(orderModel, ({ many, one }) => ({
	orderItems: many(orderItemModel),
	user: one(userModel, {
		fields: [orderModel.userId],
		references: [userModel.id],
	}),
}));
