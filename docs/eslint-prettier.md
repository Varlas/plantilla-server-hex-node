# Instalación y configuración de ESLint y Prettier

## 📦 Paso 1: Instalar dependencias

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier
```

### ¿Qué instala cada cosa?

- `eslint` → El linter base
- `@typescript-eslint/parser` → Para que ESLint entienda TypeScript
- `@typescript-eslint/eslint-plugin` → Reglas específicas de TypeScript
- `prettier` → El formateador
- `eslint-config-prettier` → Desactiva reglas de ESLint que conflictúan con Prettier
- `eslint-plugin-prettier` → Ejecuta Prettier como regla de ESLint

---

## ⚙️ Paso 2: Crear `.eslintrc.json`

```json
{
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 2022,
		"sourceType": "module",
		"project": "./tsconfig.json"
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	"plugins": ["@typescript-eslint", "prettier"],
	"rules": {
		"prettier/prettier": "error",
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/explicit-function-return-type": "off",
		"no-console": "off"
	},
	"env": {
		"node": true,
		"es2022": true
	},
	"ignorePatterns": ["dist", "node_modules", "*.js"]
}
```

---

## 🎨 Paso 3: Crear `.prettierrc`

```json
{
	"semi": true,
	"trailingComma": "es5",
	"singleQuote": true,
	"printWidth": 100,
	"tabWidth": 2,
	"useTabs": false,
	"arrowParens": "avoid",
	"endOfLine": "lf"
}
```

### Explicación de opciones:

- `semi: true` → Usa punto y coma (`;`)
- `singleQuote: true` → Comillas simples (`'`) en vez de dobles (`"`)
- `printWidth: 100` → Máximo 100 caracteres por línea
- `tabWidth: 2` → 2 espacios de indentación
- `arrowParens: "avoid"` → `x => x` en vez de `(x) => x`

---

## 🚫 Paso 4: Crear `.prettierignore`

```
node_modules
dist
build
*.log
.env
coverage
prisma/migrations
```

---

## 🚫 Paso 5: Crear `.eslintignore`

```
node_modules
dist
build
*.log
.env
coverage
prisma/migrations
```

---

## 📝 Paso 6: Añadir scripts al `package.json`

```json
{
	"scripts": {
		"dev": "tsx watch src/main.ts",
		"build": "tsc",
		"start": "node dist/main.js",
		"lint": "eslint . --ext .ts",
		"lint:fix": "eslint . --ext .ts --fix",
		"format": "prettier --write \"src/**/*.ts\"",
		"format:check": "prettier --check \"src/**/*.ts\"",
		"prisma:generate": "prisma generate",
		"prisma:migrate": "prisma migrate dev",
		"prisma:studio": "prisma studio"
	}
}
```

---

## 🎮 Uso

### Verificar errores con ESLint

```bash
npm run lint
```

### Corregir errores automáticamente

```bash
npm run lint:fix
```

### Formatear código con Prettier

```bash
npm run format
```

### Verificar formato sin cambiar

```bash
npm run format:check
```

---

## 🆚 Configuración VSCode (Recomendado)

### Paso 1: Instalar extensiones

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)

### Paso 2: Crear `.vscode/settings.json`

```json
{
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit"
	},
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"eslint.validate": ["javascript", "typescript"],
	"prettier.requireConfig": true
}
```

### ¿Qué hace esta configuración?

- ✅ Formatea automáticamente al guardar
- ✅ Ejecuta ESLint al guardar
- ✅ Usa Prettier como formateador por defecto
