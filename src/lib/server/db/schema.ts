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
export const user = pgTable("user", {
	id: varchar("id", { length: 50 })
		.$default(() => generateDatabaseId())
		.primaryKey(),
	name: varchar("name", { length: 255 }).unique().notNull(),
	slug: varchar("slug", { length: 255 }).unique().notNull(),
	searchText: text("searchText").notNull(),

	email: varchar("email", { length: 255 }).unique().notNull(),
	emailVerified: boolean("emailVerified").default(false).notNull(),

	avatar: text("avatar").default("").notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).default("").notNull(),
	isAdmin: boolean("isAdmin").default(false).notNull(),

	provider: providers("provider").notNull(),
	providerId: varchar("providerId", { length: 255 }).notNull(),

	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
	// sessions links products cart orders
});

export const userRelations = relations(user, ({ many, one }) => ({
	sessions: many(session),
	links: many(userLinks),
	products: many(product),
	cart: one(cart),
}));

// SESSIONS
export const session = pgTable("session", {
	id: varchar("id", { length: 50 })
		// .$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	userId: varchar("user_id", { length: 50 })
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));
// PRODUCTS
export const productStatus = pgEnum("status", [
	"active",
	"out of stock",
	"disactivated",
]);
export const product = pgTable("product", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	searchText: text("searchText").notNull(),
	description: varchar("description", { length: 255 }).notNull(),
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
		.references(() => user.id, { onDelete: "cascade" }),

	categoryId: varchar("categoryId", { length: 50 })
		.notNull()
		.references(() => category.id, { onDelete: "cascade" }),
});

export const productRelations = relations(product, ({ many, one }) => ({
	users: one(user, {
		fields: [product.userId],
		references: [user.id],
	}),
	images: one(productImages),
	orderItem: many(orderItem),
	cartItems: many(cartItem),
	category: one(category),
}));

// PRODUCT IMAGES
export const productImages = pgTable("productImages", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	thumbnail1: varchar("picture1", { length: 255 }).default("").notNull(),
	thumbnail2: varchar("picture2", { length: 255 }).default("").notNull(),
	thumbnail3: varchar("picture3", { length: 255 }).default("").notNull(),

	productId: varchar("productId", { length: 50 }).notNull(),
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
	product: one(product, {
		fields: [productImages.productId],
		references: [product.id],
	}),
}));
// LINKS
export const userLinks = pgTable("userLinks", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	link: varchar("link", { length: 255 }).notNull(),
	provider: linkProviders("provider").notNull().default("personal"),

	userId: varchar("userId", { length: 50 })
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
});

export const userLinksRelations = relations(userLinks, ({ one }) => ({
	user: one(user, {
		fields: [userLinks.userId],
		references: [user.id],
	}),
}));

// CATEGORIES
export const category = pgTable("category", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	name: varchar("name", { length: 200 }).unique().notNull(),
	slug: varchar("slug", { length: 255 }).unique().notNull(),

	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
	products: many(product),
}));

// // PRODUCT CATEGORY
// export const productCategory = pgTable(
// "productCategory",
// {
// productId: varchar("productId", { length: 50 })
// .references(() => product.id, { onDelete: "cascade" })
// .notNull(),
// categoryId: varchar("categoryId", { length: 50 })
// .references(() => category.id, { onDelete: "cascade" })
// .notNull(),
// },
// (t) => ({ pk: primaryKey({ columns: [t.productId, t.categoryId] }) }),
// );

// export const productCategoryRelations = relations(
// productCategory,
// ({ one }) => ({
// product: one(product, {
// fields: [productCategory.productId],
// references: [product.id],
// }),
// category: one(category, {
// fields: [productCategory.categoryId],
// references: [category.id],
// }),
// }),
// );

// CART ITEMS
export const cartItem = pgTable(
	"cartItem",
	{
		cartId: varchar("cartId", { length: 50 })
			.references(() => cart.id, { onDelete: "cascade" })
			.notNull(),
		// createdAt: timestamp("createdAt").defaultNow().notNull(),
		productId: varchar("productId", { length: 50 })
			.references(() => product.id, { onDelete: "cascade" })
			.notNull(),
		// quantity: varchar("quantity", { length: 255 }).notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.cartId, t.productId] }),
	}),
);

export const cartItemRelations = relations(cartItem, ({ one }) => ({
	cart: one(cart, {
		fields: [cartItem.cartId],
		references: [cart.id],
	}),
	product: one(product, {
		fields: [cartItem.productId],
		references: [product.id],
	}),
}));

// CART
export const cart = pgTable("cart", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	userId: varchar("userId", { length: 50 }).notNull(),
});

export const cartRelations = relations(cart, ({ many, one }) => ({
	cartItems: many(cartItem),
	user: one(user, {
		fields: [cart.userId],
		references: [user.id],
	}),
}));

// ORDER ITEMS
export const orderItem = pgTable(
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
export const orderItemRelations = relations(orderItem, ({ one }) => ({
	order: one(order, {
		fields: [orderItem.orderId],
		references: [order.id],
	}),
	product: one(product, {
		fields: [orderItem.productId],
		references: [product.id],
	}),
}));

// ORDERS
export const order = pgTable("order", {
	id: varchar("id", { length: 50 })
		.$defaultFn(() => generateDatabaseId())
		.primaryKey(),
	userId: varchar("userId", { length: 50 }).notNull(),
	products: varchar("products", { length: 255 }).notNull(),
	total: varchar("total", { length: 255 }).notNull(),
	// orderItems products users
});
export const orderRelations = relations(order, ({ many, one }) => ({
	orderItems: many(orderItem),
	user: one(user, {
		fields: [order.userId],
		references: [user.id],
	}),
}));
