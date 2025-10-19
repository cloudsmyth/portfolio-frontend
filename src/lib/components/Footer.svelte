<script lang="ts">
	export let job;
</script>

<footer class="border-grey-200 border-t bg-white">
	<div class="mx-auto max-w-7xl px-4 py-4">
		<p class="test-grey-600 text-center text-sm">
			&copy; {new Date().getFullYear()} | Spencer Smith | {job.role}
		</p>
	</div>
</footer>
