import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function CampoEntrada({ value, name, label, tipo, requerido, id, onchange, msgvalido, msginvalido, readonly, maxCaracteres}){
    return(
        <FloatingLabel>
            <Form.Control type={tipo} label={label} name={name} value={value} onChange={onchange} readOnly={readonly} maxLength={maxCaracteres}/>
            <Form.Control.Feedback>{msgvalido}</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{msginvalido}</Form.Control.Feedback>
        </FloatingLabel>
    );
}

export default CampoEntrada;