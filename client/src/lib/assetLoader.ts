/**
 * Asset Loader Utility
 * Dynamically loads images and videos from the Assets folder
 */

export interface AssetFile {
  name: string;
  path: string;
  type: 'image' | 'video' | 'pdf';
}

const ASSET_BASE = '/Assets';

const CATEGORIES = {
  advertisements: 'Advertisements',
  'ai-images': 'AI Images',
  banners: 'Banners',
  collage: 'Collage',
  invitations: 'Invitation Cards',
  logos: 'Logos',
  thumbnails: 'Thumbnails',
  other: 'Other Works',
  video: 'Videos',
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

/**
 * Get all files from a specific category folder
 * Returns array of asset files with metadata
 */
export function getAssetsByCategory(category: CategoryKey): AssetFile[] {
  const categoryPath = `${ASSET_BASE}/${category}`;
  
  // This would normally be dynamic, but for a static site we need to hardcode or use a manifest
  // For now, we'll return an empty array and populate it via direct imports
  return [];
}

/**
 * Get the display name for a category
 */
export function getCategoryLabel(category: CategoryKey): string {
  return CATEGORIES[category];
}

/**
 * Get all category keys
 */
export function getAllCategories(): CategoryKey[] {
  return Object.keys(CATEGORIES) as CategoryKey[];
}

/**
 * Determine file type from extension
 */
export function getFileType(filename: string): 'image' | 'video' | 'pdf' {
  const ext = filename.toLowerCase().split('.').pop() || '';
  if (['mp4', 'webm', 'mov'].includes(ext)) return 'video';
  if (ext === 'pdf') return 'pdf';
  return 'image';
}

/**
 * Get all image files from a category
 */
export function getImagesByCategory(category: CategoryKey): string[] {
  const categoryPath = `${ASSET_BASE}/${category}`;
  
  // For static sites, we need to manually define the files or use a build-time manifest
  // This will be populated by the component that uses it
  return [];
}

/**
 * Format filename for display
 */
export function formatFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/WhatsApp Image \d+-\d+-\d+ at \d+\.\d+\.\d+/g, '') // Remove WhatsApp timestamps
    .replace(/\s*\(\d+\)\s*/g, ' ') // Remove numbered duplicates
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}
