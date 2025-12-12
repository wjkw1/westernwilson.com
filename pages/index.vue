<template>
    <main
        class="flex flex-col items-center justify-center min-h-screen bg-[#eeeee8] text-[#1a1a1a] font-sans transition-colors duration-500 px-4">
        <img src="/logo.jpg" alt="Western Wilson Logo"
            class="w-20 h-20 sm:w-24 sm:h-24 mb-5 sm:mb-6 fade-in rounded-full object-cover" />
        <h1 class="text-2xl sm:text-4xl font-bold tracking-tight mb-2 sm:mb-3 fade-in text-center"
            style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;" data-test="title">
            Western Wilson
        </h1>
        <p class="text-base sm:text-lg mb-3 sm:mb-5 text-gray-600 fade-in text-center" data-test="subtitle">
            We’ve moved! Redirecting you to our new home...
        </p>
        <a href="https://westernwilson.webflow.io/"
            class="block break-all mt-2 mb-2 px-2 py-1 text-xs sm:text-sm text-blue-600 fade-in text-center"
            rel="noopener noreferrer" target="_blank" data-test="text-link">
            https://westernwilson.webflow.io
        </a>
        <a href="https://westernwilson.webflow.io/"
            class="mt-2 px-4 py-2 rounded bg-[#2563eb] text-white text-sm font-medium shadow hover:bg-blue-700 transition fade-in text-center"
            rel="noopener noreferrer" target="_blank" data-test="button-link">
            Go to new site now
        </a>
        <!-- Progress Bar -->
        <div class="w-full max-w-xs h-1 bg-gray-200 mt-6 rounded fade-in" data-test="progress-bar">
            <div class="h-1 bg-[#2563eb] rounded transition-all duration-500" :style="{ width: progress + '%' }" data-test="progress-inner"></div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const redirectUrl = 'https://westernwilson.webflow.io/'
const redirectDelay = 5000 // 5 seconds
const progress = ref(0)

onMounted(() => {
    const interval = setInterval(() => {
        progress.value += 100 / (redirectDelay / 100)
        if (progress.value >= 100) {
            clearInterval(interval)
        }
    }, 100)
    setTimeout(() => {
        window.location.href = redirectUrl
    }, redirectDelay)
})
</script>

<style scoped>
.fade-in {
    opacity: 0;
    animation: fadeIn 1.2s ease-in forwards;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
</style>
