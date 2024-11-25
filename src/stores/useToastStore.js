// store.js
import { useToast } from 'vue-toastification'
import MyToastComponent from '@/components/toasts/MyToastComponent.vue'
import {defineStore} from 'pinia'

export const useToastStore = defineStore('toastStore', {
    //propriedades reativas
    state(){
        return{
          type :"",
           content_toast: {},
           use_toast: false,
        }
    },
    // metodos
    actions:{
        enableToast(){
            this.use_toast = true
        },
        showToast() {
            this.use_toast = false
            const toast = useToast();
            const content = {
              component: MyToastComponent,
              props: {
                content: this.content_toast ,
              },
            };
          if(this.type === "error"){
            toast.error(content, 
              { 
                position: "top-center" ,
                timeout: 7000,
              });
          }else if(this.type === "success"){
            // Renderiza o toast com o conteúdo personalizado
            toast.success(content, 
              { 
                position: "top-center" ,
                timeout: 6000,
              });
          }

        }
    },

})


