<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { Mail, Send, User, MessageSquare } from 'lucide-svelte';

	type FormData = {
		name: string;
		email: string;
		subject: string;
		message: string;
	};

	let formData: FormData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	let isSubmitting = false;

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!formData.name || !formData.email || !formData.message) {
			toast.error('Please fill in all required fields');
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (response.ok) {
				toast.success('Message sent successfully!');
				formData = {
					name: '',
					email: '',
					subject: '',
					message: ''
				};
			} else {
				toast.error(result.error || 'Failed to send message. Please try again.');
			}
		} catch (error) {
			toast.error('Failed to send message. Please try again.');
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="container mx-auto max-w-2xl px-4 py-16">
	<div class="space-y-8">
		<div class="space-y-4 text-center">
			<h1 class="text-4xl font-bold tracking-tight">Get in Touch</h1>
			<p class="text-lg text-muted-foreground">
				Have a question or want to work together? I'd love to hear from you.
			</p>
		</div>

		<form on:submit={handleSubmit} class="space-y-6">
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="space-y-2">
					<Label for="name" class="flex items-center gap-2">
						<User class="h-4 w-4" />
						Name *
					</Label>
					<Input
						id="name"
						type="text"
						placeholder="Full Name"
						bind:value={formData.name}
						required
						disabled={isSubmitting}
					/>
				</div>

				<div class="space-y-2">
					<Label for="email" class="flex items-center gap-2">
						<Mail class="h-4 w-4" />
						Email *
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="email@example.com"
						bind:value={formData.email}
						required
						disabled={isSubmitting}
					/>
				</div>
			</div>

			<div class="space-y-2">
				<Label for="subject" class="flex items-center gap-2">
					<MessageSquare class="h-4 w-4" />
					Subject
				</Label>
				<Input
					id="subject"
					type="text"
					placeholder="What's this about?"
					bind:value={formData.subject}
					disabled={isSubmitting}
				/>
			</div>

			<div class="space-y-2">
				<Label for="message">Message *</Label>
				<Textarea
					id="message"
					placeholder="Tell me about your project or inquiry..."
					bind:value={formData.message}
					required
					disabled={isSubmitting}
					rows={6}
					class="resize-none"
				/>
			</div>

			<Button type="submit" class="w-full sm:w-auto" disabled={isSubmitting}>
				{#if isSubmitting}
					Sending...
				{:else}
					<Send class="mr-2 h-4 w-4" />
					Send Message
				{/if}
			</Button>
		</form>

		<div class="border-t pt-8">
			<p class="text-center text-sm text-muted-foreground">
				Or reach out directly at <a
					href="mailto:smith.spence13@gmail.com"
					class="underline transition-colors hover:text-foreground">smith.spence13@gmail.com</a
				>
			</p>
		</div>
	</div>
</div>
