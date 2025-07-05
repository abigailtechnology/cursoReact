import React from 'react';

interface IInputLoginProps {
    type?: string;
    label: string;
    value: string;
    onPressEnter?: () => void;
    onChange: (newValue: string) => void; //eventos em componentes
}
export const InputLogin = React.forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
    return (
        <label>
            <span>{props.label}</span>
            <input
                //ref={ref}
                type={props.type} //recebe as propriedades
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? props.onPressEnter && props.onPressEnter() : undefined}
                //Se ao apertar Enter a função foi indefinida não irá executar
            />
        </label>
    )
});