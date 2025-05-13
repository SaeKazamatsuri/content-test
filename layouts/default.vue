<template>
	<div class="flex flex-col min-h-screen">
		<header class="bg-white shadow-md sticky top-0 z-10">
			<div class="max-w-[1200px] mx-auto px-8 py-4 flex justify-between items-center">
				<NuxtLink to="/" class="text-2xl font-bold text-gray-800 no-underline">
					ブログサイト
				</NuxtLink>
			</div>
		</header>

		<main class="flex-1 py-8">
			<slot />
		</main>

		<footer class="bg-gray-100 py-8 mt-auto">
			<div class="max-w-[1200px] mx-auto px-8 text-center">
				<p class="text-gray-600 text-sm">
					© {{ new Date().getFullYear() }} ブログサイト. All Rights Reserved.
				</p>
			</div>
		</footer>
	</div>
</template>
