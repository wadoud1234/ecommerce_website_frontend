<script>
	import StarRating from '@ernane/svelte-star-rating';
	export let score;
	export let showScore = false;
	export let readOnly = true;
	export let starSize = 30;
	const config = {
		readOnly,
		countStars: 5,
		range: {
			min: 0,
			max: 5,
			step: 0.001
		},
		score: score ? score : 0,
		showScore,
		scoreFormat: function () {
			return `(${this.score.toFixed(1)}/${this.countStars})`;
		},
		name: '',
		starConfig: {
			size: starSize,
			fillColor: '#F9ED4F',
			strokeColor: '#BB8511',
			unfilledColor: '#FFF',
			strokeUnfilledColor: '#000'
		}
	};
</script>

<StarRating {config} />
