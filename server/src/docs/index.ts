import path from 'path';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { createApp } from '../app';

const options = {
  info: {
    version: '0.0.0',
    title: 'Spaceedo DOCS',
    license: {
      name: 'MIT',
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: path.resolve(__dirname, '../'),
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: ['./docs/**/*.{ts,js}', './router/v1/**/*.{ts,js}'],
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api/v1/docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: true,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v1/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

export function initDocs(app: ReturnType<typeof createApp>) {
  expressJSDocSwagger(app)(options);
}
