/**
 * Icon mapping utilities
 * Maps icon names to emoji representations
 */

export function getIconEmoji(iconName: string): string {
  const iconMap: Record<string, string> = {
    Zap: '⚡',
    Rocket: '🚀',
    Trophy: '🏆',
    Target: '🎯',
    Star: '⭐',
    Heart: '❤️',
    Flag: '🚩',
    Sparkles: '✨',
    Code: '💻',
    Coffee: '☕',
    Lightbulb: '💡',
    Briefcase: '💼',
  }
  return iconMap[iconName] || '📌'
}
