import React, {FC, ReactNode, useCallback} from 'react';
import {useDropzone} from "react-dropzone";

interface IProps {
    onDrop: (file: any) => void,
    children?: ReactNode,
    disabled?: boolean
}

const DropZone: FC<IProps> = ({onDrop, disabled, children}) => {
    const {getInputProps, getRootProps, isDragAccept} = useDropzone({
        onDrop: (files) => onDrop(files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))),
        disabled,
        accept: {
            'image/jpeg': ['.jpeg', '.png']
        }
    })
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()}/>
            {
                children ? children : <div>
                    sdasd
                </div>
            }
        </div>
    );
};

export default DropZone;