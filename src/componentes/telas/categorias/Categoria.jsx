import { useState, useEffect } from "react";
import CategoriaContext from './CategoriaContext';
import { getCategoriasAPI, getCategoriaPorCodigoAPI, deleteCategoriaPorCodigoAPI, cadastrarCategoriaAPI } from '../../../servicos/CategoriaServico';
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";

function Categoria(){
    const [alerta, setAlerta] = useState({ status: "", message: ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({codigo: "", nome: "", descricao: "", sigla: ""});
    const [carregando, setCarregando] = useState(true);

    const recuperaCategorias = async () => {
        setCarregando(true);
        setListaObjetos(await getCategoriasAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if(window.confirm('Deseja remover este objeto?')){
            let rAPI = await deleteCategoriaPorCodigoAPI(codigo);
            setAlerta({ status: rAPI.status, message: rAPI.message})
            recuperaCategorias();
        }
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: ""});
        setObjeto({ codigo: 0, nome: "" });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(await getCategoriaPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try{
            let rAPI = await cadastrarCategoriaAPI(objeto, metodo);
            setAlerta({ status: rAPI.status, message: rAPI.message });
            setObjeto(rAPI.objeto);
            if(!editar){
                setEditar(true);
            }
        }catch (err){
            console.error(err.message);
        }
        recuperaCategorias();
    };

    const handleChange = (e) => {
        const n = e.target.name;
        const v = e.target.value;
        setObjeto({ ...objeto, [n]: v});
    }

    useEffect(() => {
        recuperaCategorias();
    }, []);

    return(
        <CategoriaContext.Provider
            value={{exibirForm, alerta, listaObjetos, remover, objeto, editarObjeto, acaoCadastrar, handleChange, novoObjeto, setExibirForm}}>
            <Carregando carregando={carregando}>
                <Tabela/>
            </Carregando>
            <Formulario/>
        </CategoriaContext.Provider>
    );
}

export default Categoria;