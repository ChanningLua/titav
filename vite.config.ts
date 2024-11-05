import DTS from 'vite-plugin-dts';
import { defineConfig } from 'vite';
import path from 'path';

const root = process.cwd();
const mode = process.env.MODE as 'production' | 'demo';

const productionConfig = defineConfig({
   plugins: [
      DTS({
         outputDir: 'dist',
         tsConfigFilePath: path.resolve(root, 'tsconfig.build.json'),
      }),
   ],
   build: {
      target: 'esnext',
      lib: {
         entry: path.resolve(root, 'src', 'index.ts'),
         formats: ['es', 'cjs'],
      },
   },
});

const demoConfig = defineConfig({
   root: path.join(root, 'demo'),
   base: '/dsbridge-external/',
   build: {
      emptyOutDir: true,
      outDir: path.join(root, 'dist-demo'),
   },
});

export default mode === 'demo' ? demoConfig : productionConfig;
