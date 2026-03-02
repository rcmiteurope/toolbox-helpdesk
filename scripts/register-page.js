/**
 * Page Registration Script
 *
 * Registers an existing component into the main routes and sidebar.
 * Usage: node scripts/register-page.js <page-name>
 * Example: node scripts/register-page.js tickets
 *
 * What it does:
 *   1. Adds a lazy-loaded route to src/app/main/main.routes.ts
 *   2. Adds a sidebar nav link with a default icon to sidebar.component.html
 */

const fs = require('fs');
const path = require('path');

// --- Helpers ---

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toTitleCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// --- Main ---

const pageName = process.argv[2];

if (!pageName) {
  console.error('\x1b[31m✗ Error: Please provide a page name.\x1b[0m');
  console.error('  Usage: node scripts/register-page.js <page-name>');
  console.error('  Example: node scripts/register-page.js tickets');
  process.exit(1);
}

const kebab = toKebabCase(pageName);
const pascal = toPascalCase(pageName);
const title = toTitleCase(pageName);
const className = `${pascal}Component`;

const ROOT = path.resolve(__dirname, '..');
const ROUTES_FILE = path.join(ROOT, 'src/app/main/main.routes.ts');
const SIDEBAR_FILE = path.join(
  ROOT,
  'src/app/_shared/components/layout/sidebar.component.html'
);

// --- Step 1: Add route to main.routes.ts ---

console.log('\n📦 Registering page: \x1b[36m%s\x1b[0m\n', title);

let routesContent = fs.readFileSync(ROUTES_FILE, 'utf-8');

// Check if route already exists
if (routesContent.includes(`path: '${kebab}'`)) {
  console.log(
    '  \x1b[33m⚠ Route "%s" already exists in main.routes.ts — skipping.\x1b[0m',
    kebab
  );
} else {
  const newRoute = `  {
    path: '${kebab}',
    loadComponent: () => import('./${kebab}/${kebab}.component').then((m) => m.${className}),
  },`;

  // Insert before the closing ];
  routesContent = routesContent.replace(/\n\];/, `\n${newRoute}\n];`);
  fs.writeFileSync(ROUTES_FILE, routesContent, 'utf-8');
  console.log('  \x1b[32m✓ Added route:\x1b[0m /main/%s', kebab);
}

// --- Step 2: Add sidebar link ---

let sidebarContent = fs.readFileSync(SIDEBAR_FILE, 'utf-8');

// Check if sidebar link already exists
if (sidebarContent.includes(`routerLink="/main/${kebab}"`)) {
  console.log(
    '  \x1b[33m⚠ Sidebar link "%s" already exists — skipping.\x1b[0m',
    title
  );
} else {
  // Default icon: a simple circle (Lucide "circle" icon)
  const sidebarLink = `      <a
        routerLink="/main/${kebab}"
        routerLinkActive="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
        class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        ${title}
      </a>`;

  // Insert before </nav>
  sidebarContent = sidebarContent.replace(
    '    </nav>',
    `${sidebarLink}\n    </nav>`
  );
  fs.writeFileSync(SIDEBAR_FILE, sidebarContent, 'utf-8');
  console.log('  \x1b[32m✓ Added sidebar link:\x1b[0m %s', title);
}

console.log('\n\x1b[32m✔ Done!\x1b[0m\n');
