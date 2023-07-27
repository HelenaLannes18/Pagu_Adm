"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Tabela } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
//@ts-ignore
import QuillBetterTable from 'quill-better-table';
//@ts-ignore
import katex from 'katex';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill-with-table';
import 'react-quill-with-table/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';
import 'katex/dist/katex.min.css';

Quill.register({ 'modules/better-table': QuillBetterTable });
//@ts-ignore
window.katex = katex;

const formSchema = z.object({
  name: z.string().min(1),
});

type TabelaFormValues = z.infer<typeof formSchema>

interface TabelaFormProps {
  initialData: Tabela | null;
};




export const TabelaForm: React.FC<TabelaFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Editar tabela' : 'Criar tabela';
  const description = initialData ? 'Editar um tabela.' : 'Adicionar um novo tabela';
  const toastMessage = initialData ? 'Tabela atualizado.' : 'Tabela criado.';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const [editorValue, setEditorValue] = useState('');

  const handleEditorChange = (value: any) => {
    setEditorValue(value);
  };

  const form = useForm<TabelaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: ''
    }
  });

  const onSubmit = async (data: TabelaFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/tabelas/${params.tabelaId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/tabelas`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/tabelas`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Algo deu errado.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/tabelas/${params.tabelaId}`);
      router.refresh();
      router.push(`/${params.storeId}/tabelas`);
      toast.success('Tabela deletado.');
    } catch (error: any) {
      toast.error('Tenha certeza que você removeu todos os produtos que usam esse tabela antes.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const reactQuillRef = useRef(null);
  const [editorState, setEditorState] = useState('');

  const insertTable = () => {
    //@ts-ignore
    const editor = reactQuillRef.current.getEditor();
    const tableModule = editor.getModule('better-table');
    tableModule.insertTable(3, 3);
  };



  useEffect(() => {
    //@ts-ignore
    const editor = reactQuillRef.current.getEditor();
    const toolbar = editor.getModule('toolbar');
    toolbar.addHandler('table', () => {
      insertTable();
    });
  }, []);

  const modules = useMemo(
    () => ({
      table: false,
      'better-table': {
        operationMenu: {
          items: {
            unmergeCells: {
              text: 'Another unmerge cells name',
            },
          },
        },
      },
      keyboard: {
        bindings: QuillBetterTable.keyboardBindings,
      },
      toolbar: [
        [
          'bold',
          'italic',
          'underline',
          'strike',
          { align: [] },
          { script: 'sub' },
          { script: 'super' },
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ], // toggled buttons
        ['formula', 'table'],
      ],
    }),
    []
  );
  console.log('editorState', editorState);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <ReactQuill
                      // disabled={loading}
                      placeholder="Nome da tabela"
                      ref={reactQuillRef}
                      modules={modules}
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <ReactQuill
              // value={value}
              ref={reactQuillRef}
              modules={modules}
              theme="snow"
              onChange={handleEditorStateChange}
            /> */}



          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
