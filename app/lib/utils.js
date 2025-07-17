export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export const formatCurrency = (amount, currency = 'XTZ') => {
  return `${amount.toLocaleString()} ${currency}`
}

export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(2)}%`
}

export const truncateAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}