<script lang="ts">
	import DATA from '../../data/data.ts';
	import me from '$lib/assets/me.png';
	const about = DATA.ABOUT;
</script>

<div class="grid w-[85%] place-self-center">
	<div class="grid grid-cols-3 gap-4">
		<h1 class="col-span-3 mb-4 place-self-center">Building Things, Learning Always</h1>
		<img class="place-self-center" alt="Me at a lake" src={me} />
		<p class="col-span-2 pl-4">{about.full_bio}</p>
	</div>
</div>
