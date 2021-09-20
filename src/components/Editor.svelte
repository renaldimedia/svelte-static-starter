<script>
  import { onMount, onDestroy } from "svelte";
  import ClassicEditor from "./_ckeditor/ckeditor.js";
  import { authToken } from "../stores/auth";
  import { BASE_ADMIN_URL } from "../stores/index";

  export let value = "";
  let ins;
  export let id;

  // If needed, custom editor config can be passed through to the component
  // Uncomment the custom editor config if you need to customise the editor.
  // Note: If you don't pass toolbar object then Document editor will use default set of toolbar items.
  let editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "fontBackgroundColor",
        "fontColor",
        "fontFamily",
        "fontSize",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "imageUpload",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "undo",
        "redo",
        "|",
        "codeBlock",
        "htmlEmbed",
        "alignment",
      ],
      shouldNotGroupWhenFull: true,
    },
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: BASE_ADMIN_URL + "/upload/upload_ajax",

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: false,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
        "X-CSRF-TOKEN": "",
        Authorization: $authToken,
      },
    },
  };

  $: {
    if (typeof ins != "undefined" && typeof ins.getData == "function") {
      value = ins.getData();
    }
  }

  onMount(() => {
    console.log(value);
    ClassicEditor.create(document.querySelector("#" + id), editorConfig)
      .then((editor) => {
        console.log('editr')
        // editors[ elementId ] = editor;
        // $instance.push({id, ed:  document.querySelector( '#' + id )});
        editor.setData(value); // You should set editor data here
        ins = editor;
        editor.model.document.on("change:data", (event) => {
          value = editor.getData();
        });
      })
      .catch((err) => console.error(err));
  });
</script>

<div class="py-4">
  <textarea {id} cols="30" rows="10" />
</div>
