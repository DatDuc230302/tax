import Editor from 'ckeditor5-custom-build/build/ckeditor'
import {CKEditor} from '@ckeditor/ckeditor5-react'

export default function TextEditor(){
    const editorConfiguration ={
        toolbar: {
			items: [
				'ckbox',
				'|',
				'codeBlock',
				'|',
				'exportPdf',
				'exportWord',
				'|',
				'fontBackgroundColor',
				'fontSize',
				'highlight',
				'style',
				'-',
				'heading',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'outdent',
				'indent',
				'alignment',
				'imageUpload',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'undo',
				'fontFamily',
				'fontColor',
				'redo'
			],
    },
    language: 'vi',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		}
		
	};
    return(
        <>
        <CKEditor
        editor={Editor}
        config={{
            editorConfiguration
        }}
        />
        </>
    )
}