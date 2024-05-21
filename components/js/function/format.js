export function formatNumberWithSuffix(num,digit) {
    const suffixes = ['', 'K', 'M','G','T','P']; // Add more suffixes as needed

    for (let i = suffixes.length - 1; i >= 0; i--) {
        const magnitude = Math.pow(10, i * 3);
        if (num >= magnitude) {
            // Divide by magnitude, round the result, and then add the suffix
            return (num / magnitude).toFixed(digit) + suffixes[i];
        }
    }

    return num.toString();
}
