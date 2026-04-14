export const getCategoriasAPI = async () => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/categoria`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}

export const getCategoriaPorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/categoria/${codigo}`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}   

export const deleteCategoriaPorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/categoria/${codigo}`,
        {
            method:"DELETE",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}  

export const cadastrarCategoriaAPI = async (objeto, metodo) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/categoria/`,
        {
            method: metodo,
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(objeto)
        }
    )
    const d = await r.json();
    return d;
}