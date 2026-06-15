import fs from 'fs';
import path from 'path';

console.log('🔄 Resetting local Cloudflare KV Analytics...');

const kvPath = path.resolve('.wrangler/state/v3/kv');

if (fs.existsSync(kvPath)) {
    try {
        fs.rmSync(kvPath, { recursive: true, force: true });
        console.log('✅ Local analytics have been successfully reset.');
        console.log('⚠️  Note: This also clears your local admin session. You will need to log in again.');
    } catch (err) {
        console.error('❌ Failed to reset analytics:', err.message);
    }
} else {
    console.log('⚠️  Local KV state not found. Nothing to reset. Data is already clean.');
}
