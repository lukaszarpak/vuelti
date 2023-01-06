declare module "vue-select" {
  import { Component } from "vue";
  export default (): Component => {};
}

declare module "vue-safe-html" {
  import { Component } from "vue";
  export default (): Component => {};

  export const allowedTags: string[];
}

declare module "@ckeditor/ckeditor5-vue" {
  import { Component } from "vue";

  export const component: Component;
}

declare module "@ckeditor/ckeditor5-build-classic" {
  export default any;
}
