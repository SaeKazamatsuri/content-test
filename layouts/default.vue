<template>
	<div class="flex flex-col min-h-screen transition-colors duration-300"
		:class="{ 'dark:bg-gray-900 dark:text-white': $colorMode.value === 'dark' }">
		<header class="sticky top-0 z-10 shadow-md transition-colors duration-300" :class="{
			'bg-white': $colorMode.value === 'light',
			'bg-gray-800 text-white': $colorMode.value === 'dark'
		}">
			<div class="max-w-[1200px] mx-auto px-8 py-4 flex justify-between items-center">
				<NuxtLink to="/" class="text-2xl font-bold no-underline transition-colors duration-300" :class="{
					'text-gray-800': $colorMode.value === 'light',
					'text-white': $colorMode.value === 'dark'
				}">
					ブログサイト
				</NuxtLink>

				<div class="flex items-center gap-4">
					<!-- シンプルなテーマ切替トグルボタン -->
					<button @click="toggleColorMode"
						class="p-2 rounded-full transition-colors duration-300 flex items-center justify-center" :class="{
							'hover:bg-gray-200': $colorMode.value === 'light',
							'hover:bg-gray-700': $colorMode.value === 'dark'
						}">
						<Icon v-if="$colorMode.value === 'dark'" name="uil:sun" class="text-xl" />
						<Icon v-else name="uil:moon" class="text-xl" />
					</button>
				</div>
			</div>
		</header>

		<main class="flex-1 py-8 transition-colors duration-300"
			:class="{ 'dark:bg-gray-900': $colorMode.value === 'dark' }">
			<slot />
		</main>

		<footer class="py-8 mt-auto transition-colors duration-300" :class="{
			'bg-gray-100': $colorMode.value === 'light',
			'bg-gray-800 text-white': $colorMode.value === 'dark'
		}">
			<div class="max-w-[1200px] mx-auto px-8 text-center">
				<p class="text-sm transition-colors duration-300" :class="{
					'text-gray-600': $colorMode.value === 'light',
					'text-gray-300': $colorMode.value === 'dark'
				}">
					© {{ new Date().getFullYear() }} ブログサイト. All Rights Reserved.
				</p>
			</div>
		</footer>
	</div>
</template>

<script setup>
const colorMode = useColorMode()

// シンプルなテーマ切替関数（現在のモードを判断して切り替え）
const toggleColorMode = () => {
	// 現在のモードがダークなら次はライト、それ以外ならダーク
	colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// ページロード時にシステムテーマをデフォルトとして設定
onMounted(() => {
	// 初回訪問時のみシステムテーマを適用（ユーザーが明示的に設定していない場合）
	if (!localStorage.getItem('nuxt-color-mode')) {
		colorMode.preference = 'system'
	}
})

</script>

<style>
/* ダークモード時のスタイル調整のためのグローバルスタイル */
body {
	@apply transition-colors duration-300;
}

.dark body {
	@apply bg-gray-900 text-white;
}
</style>