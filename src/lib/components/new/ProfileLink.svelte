<script lang="ts">
	import { FacebookLogo, GithubLogo, GoogleLogo, InstagramLogo, TwitterLogo } from "$lib/icons";
	import { LinkProviders as LP } from "$lib/types";
        
    export let link:string;
    export let provider : LP | string
    let Icon:any
    switch (provider){
        case LP.GOOGLE:
            Icon = GoogleLogo
            break;
        case LP.GITHUB:
            Icon = GithubLogo
            break
        case LP.FACEBOOK:
            Icon = FacebookLogo
            break
        case LP.INSTAGRAM:
            Icon = InstagramLogo
            break
        case LP.TWITTER:
            Icon = TwitterLogo
            break
        default:
            Icon=""
            break
        }
            
            
</script>
<button aria-label={provider} class="icon-button">
    <a href={link}>
        <img
            loading="lazy"
            src={Icon}
            alt={provider}
            class="social-icons"
            aria-label="Button"
        />
    </a>
</button>
<style>
    .icon-button {
		@apply cursor-pointer
        
	}
	.social-icons {
		@apply w-7 bg-zinc-100 dark:bg-zinc-300 p-1 rounded-lg;
	}
</style>