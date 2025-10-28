<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Terminal } from '@xterm/xterm';
	import { FitAddon } from '@xterm/addon-fit';
	import { WebLinksAddon } from '@xterm/addon-web-links';
	import '@xterm/xterm/css/xterm.css';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import {
		CircleQuestionMark,
		List,
		RotateCcw,
		Circle,
		Terminal as TerminalIcon
	} from 'lucide-svelte';

	let terminalElement: HTMLDivElement;
	let terminal: Terminal;
	let fitAddon: FitAddon;
	let ws: WebSocket;
	let isConnected = false;
	let reconnectAttempts = 0;
	const maxReconnectAttempts = 5;
	const reconnectDelay = 2000;
	let resizeTimeout: ReturnType<typeof setTimeout>;
	let lastKnownSize = { rows: 0, cols: 0 };

	const WS_URL = 'ws://localhost:8080/ws';

	onMount(() => {
		initTerminal();
		connectWebSocket();

		const handleResize = () => {
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
			resizeTimeout = setTimeout(() => {
				if (fitAddon && terminal) {
					fitAddon.fit();
					sendResize();
				}
			}, 100);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
		};
	});

	onDestroy(() => {
		if (ws) {
			ws.close();
		}
		if (terminal) {
			terminal.dispose();
		}
	});

	function initTerminal() {
		terminal = new Terminal({
			cursorBlink: true,
			fontSize: 14,
			fontFamily: 'Menlo, Monaco, "Courier New", monospace',
			theme: {
				background: '#1e1e1e',
				foreground: '#d4d4d4',
				cursor: '#d4d4d4',
				cursorAccent: '#1e1e1e',
				selectionBackground: '#264f78',
				black: '#000000',
				red: '#cd3131',
				green: '#0dbc79',
				yellow: '#e5e510',
				blue: '#2472c8',
				magenta: '#bc3fbc',
				cyan: '#11a8cd',
				white: '#e5e5e5',
				brightBlack: '#666666',
				brightRed: '#f14c4c',
				brightGreen: '#23d18b',
				brightYellow: '#f5f543',
				brightBlue: '#3b8eea',
				brightMagenta: '#d670d6',
				brightCyan: '#29b8db',
				brightWhite: '#e5e5e5'
			},
			allowProposedApi: true,
			scrollback: 10000,
			convertEol: true
		});

		fitAddon = new FitAddon();
		terminal.loadAddon(fitAddon);
		terminal.loadAddon(new WebLinksAddon());

		terminal.open(terminalElement);

		fitAddon.fit();

		terminal.focus();

		terminal.writeln('Connecting to terminal server...');
	}

	function setupTerminalInput() {
		terminal.onData((data) => {
			if (!ws) {
				console.error('ws is null/undefined!');
				return;
			}

			if (ws.readyState !== WebSocket.OPEN) {
				console.error('WebSocket not open! State:', ws.readyState);
				return;
			}

			const msg = JSON.stringify({ input: data });

			try {
				ws.send(msg);
			} catch (e) {
				console.error('Error sending to WebSocket:', e);
			}
		});

		terminal.onBinary((data) => {
			if (ws && ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify({ input: data }));
			}
		});
	}

	function connectWebSocket() {
		try {
			ws = new WebSocket(WS_URL);

			ws.onopen = () => {
				isConnected = true;
				reconnectAttempts = 0;
				terminal.clear();
				terminal.writeln('\x1b[32mConnected to server!\x1b[0m');
				terminal.writeln('You can now type commands.');
				terminal.writeln('');
				setupTerminalInput();
				sendResize();
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					if (data.output) {
						terminal.write(data.output);
					}
				} catch (e) {
					console.error('Error parsing message:', e, 'Data:', event.data);
				}
			};

			ws.onerror = () => {
				terminal.writeln('\r\n\x1b[31mWebSocket error occurred\x1b[0m');
			};

			ws.onclose = () => {
				isConnected = false;
				terminal.writeln('\r\n\x1b[33mDisconnected from server\x1b[0m');

				if (reconnectAttempts < maxReconnectAttempts) {
					reconnectAttempts++;
					terminal.writeln(
						`\r\nReconnecting... (attempt ${reconnectAttempts}/${maxReconnectAttempts})`
					);
					setTimeout(() => {
						connectWebSocket();
					}, reconnectDelay);
				} else {
					terminal.writeln('\r\n\x1b[31mFailed to reconnect. Please refresh the page.\x1b[0m');
				}
			};
		} catch (error) {
			console.error('[Failed to create WebSocket:', error);
			terminal.writeln('\r\n\x1b[31mFailed to connect to server\x1b[0m');
		}
	}

	function sendCommand(command: string) {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({ command }));
		} else {
			console.error('Cannot send command, WebSocket not ready');
		}
	}

	function sendResize() {
		if (ws && ws.readyState === WebSocket.OPEN && terminal) {
			const rows = terminal.rows;
			const cols = terminal.cols;

			// Only send if size has actually changed
			if (rows !== lastKnownSize.rows || cols !== lastKnownSize.cols) {
				lastKnownSize = { rows, cols };
				const msg = {
					resize: {
						rows,
						cols
					}
				};
				ws.send(JSON.stringify(msg));
			}
		}
	}

	function executeCommand(cmd: string) {
		terminal.writeln(`\r\n$ ${cmd}`);
		sendCommand(cmd);
	}
</script>

<div class="grid w-[80%] grid-rows-[auto_1fr] place-self-center">
	<div class="border-b bg-muted/40 px-4 py-3">
		<div class="grid grid-cols-[1fr_auto] items-center gap-4">
			<div class="flex items-center gap-3">
				<div class="flex items-center gap-2">
					<Circle
						class={`h-2 w-2 fill-current ${isConnected ? 'text-green-500' : 'text-destructive'}`}
					/>
					<Badge variant={isConnected ? 'default' : 'secondary'}>
						{isConnected ? 'Connected' : 'Disconnected'}
					</Badge>
				</div>
				<Separator orientation="vertical" class="h-6" />
				<div class="flex items-center gap-2">
					<TerminalIcon class="h-4 w-4 text-muted-foreground" />
					<h2 class="text-base font-semibold">Terminal (Debug Mode)</h2>
				</div>
			</div>
			<div class="flex items-center gap-1">
				<Button
					variant="ghost"
					size="icon"
					onclick={() => executeCommand('help')}
					title="Show help"
				>
					<CircleQuestionMark class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => executeCommand('list')}
					title="List apps"
				>
					<List class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => executeCommand('clear')}
					title="Clear terminal"
				>
					<RotateCcw class="h-4 w-4" />
				</Button>
			</div>
		</div>
	</div>

	<div class="min-h-[700px] overflow-hidden bg-[#1e1e1e]">
		<div bind:this={terminalElement} class="h-full w-full p-4"></div>
	</div>
</div>

<style>
	:global(.xterm) {
		height: 100%;
		padding: 0;
	}

	:global(.xterm-viewport) {
		overflow-y: auto !important;
	}
</style>
