<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import * as Alert from '$lib/components/ui/alert';
	import { Terminal, Trash2, Wifi, WifiOff } from 'lucide-svelte';

	type OutputType = 'command' | 'output' | 'error' | 'system';

	interface TerminalLine {
		text: string;
		type: OutputType;
		id: string;
	}

	interface CommandMessage {
		command: string;
	}

	let terminal: HTMLDivElement;
	let commandInput: string = '';
	let terminalOutput: TerminalLine[] = [];
	let ws: WebSocket | null = null;
	let isConnected: boolean = false;

	const webSocketURL = 'ws://localhost:8080/ws';
	const RECONNECT_DELAY = 3000;

	onMount(() => {
		if (browser) {
			connectWebSocket();
		}
	});

	onDestroy(() => {
		if (ws) {
			ws.close();
		}
	});

	function connectWebSocket(): void {
		try {
			ws = new WebSocket(webSocketURL);

			ws.onopen = () => {
				isConnected = true;
				addOutput('Terminal Connected. Type your commands.', 'system');
			};

			ws.onmessage = (event: MessageEvent) => {
				try {
					const data = JSON.parse(event.data);
					addOutput(data.output, 'output');
				} catch (error) {
					console.error('Error parsing WebSocket message: ', error);
					addOutput('Error receiving message from the server', 'error');
				}
			};

			ws.onerror = (error: Event) => {
				console.error('WebSocket error: ', error);
				addOutput('WebSocket error occured', 'error');
				isConnected = false;
			};

			ws.onclose = () => {
				isConnected = false;
				addOutput('Connection closed. Attempting to reconnect....', 'system');

				setTimeout(() => {
					if (browser) {
						connectWebSocket();
					}
				}, RECONNECT_DELAY);
			};
		} catch (error) {
			console.error('Failed to create a WebSocket connection: ', error);
			addOutput('Failed to connect to server', 'error');
		}
	}

	function addOutput(text: string, type: OutputType = 'output'): void {
		const newLine: TerminalLine = {
			text,
			type,
			id: `${Date.now()}-${Math.random}`
		};

		terminalOutput = [...terminalOutput, newLine];

		setTimeout(() => {
			if (terminal) {
				terminal.scrollTop = terminal.scrollHeight;
			}
		}, 0);
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Enter' && commandInput.trim()) {
			executeCommand(commandInput.trim());
			commandInput = '';
		}
	}

	function executeCommand(command: string): void {
		addOutput(`$ ${command}`, 'command');

		if (ws && ws.readyState === WebSocket.OPEN) {
			const message: CommandMessage = { command };
			ws.send(JSON.stringify(message));
		} else {
			addOutput('Not connected to server. Reconnecting...', 'error');
			connectWebSocket();
		}
	}

	function clearTerminal(): void {
		terminalOutput = [];
		addOutput('Terminal cleared', 'system');
	}
</script>

<svelte:head>
	<title>Terminal - Portfolio</title>
	<meta name="description" content="Interactive terminal showcase" />
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-8">
	<div class="mb-6">
		<h1 class="mb-2 flex items-center gap-2 text-3xl font-bold">
			<Terminal class="h-8 w-8" />
			Web Terminal
		</h1>
		<p class="text-muted-foreground">Interactive terminal for trying my custom applications</p>
	</div>

	{#if !isConnected}
		<Alert.Root variant="destructive" class="mb-4">
			<WifiOff class="h-4 w-4" />
			<Alert.Title>Connection Lost</Alert.Title>
			<Alert.Description>
				Unable to connect to the terminal server. Attempting to reconnect...
			</Alert.Description>
		</Alert.Root>
	{/if}

	<Card class="overflow-hidden">
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-4">
			<div class="flex items-center gap-2">
				<div class="flex gap-1.5">
					<div class="h-3 w-3 rounded-full bg-red-500"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
					<div class="h-3 w-3 rounded-full bg-green-500"></div>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<Badge variant={isConnected ? 'default' : 'secondary'} class="gap-1.5">
					{#if isConnected}
						<Wifi class="h-3 w-3" />
						Connected
					{:else}
						<WifiOff class="h-3 w-3" />
						Disconnected
					{/if}
				</Badge>
				<Button variant="outline" size="sm" onclick={clearTerminal} disabled={!isConnected}>
					<Trash2 class="mr-2 h-4 w-4" />
					Clear
				</Button>
			</div>
		</CardHeader>

		<Separator />

		<CardContent class="p-0">
			<ScrollArea class="h-[500px]">
				<div
					bind:this={terminal}
					class="terminal-body p-6 font-mono text-sm"
					role="log"
					aria-live="polite"
					aria-atomic="false"
				>
					{#each terminalOutput as line (line.id)}
						<div class="terminal-line {line.type}">
							{line.text}
						</div>
					{/each}
				</div>
			</ScrollArea>

			<Separator />

			<div class="input-area bg-muted/50 p-4">
				<div class="flex max-w-full items-center gap-2">
					<span class="prompt shrink-0 font-bold text-primary">$</span>
					<input
						type="text"
						bind:value={commandInput}
						on:keydown={handleKeyDown}
						placeholder="Type a command..."
						disabled={!isConnected}
						class="flex-1 border-none bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
						aria-label="Command input"
						autocomplete="off"
						spellcheck="false"
					/>
				</div>
			</div>
		</CardContent>
	</Card>

	<div class="mt-4 text-sm text-muted-foreground">
		<p>
			Type <code class="rounded bg-muted px-1.5 py-0.5 text-foreground">help</code> to see available
			commands or <code class="rounded bg-muted px-1.5 py-0.5 text-foreground">list</code> to view apps.
		</p>
	</div>
</div>

<style>
	.terminal-body {
		background: hsl(var(--background));
		color: hsl(var(--foreground));
		min-height: 500px;
		overflow-y: auto;
	}

	.terminal-line {
		white-space: pre-wrap;
		word-wrap: break-word;
		margin-bottom: 0.25rem;
		line-height: 1.6;
	}

	.terminal-line.command {
		color: hsl(var(--primary));
		font-weight: 600;
	}

	.terminal-line.output {
		color: hsl(var(--foreground));
	}

	.terminal-line.error {
		color: hsl(var(--destructive));
	}

	.terminal-line.system {
		color: hsl(var(--warning));
	}

	.input-area {
		background: hsl(var(--muted) / 0.5);
	}

	.prompt {
		color: hsl(var(--primary));
	}

	@media (max-width: 768px) {
		.terminal-body {
			min-height: 400px;
		}
	}
</style>
