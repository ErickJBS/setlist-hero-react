import React from 'react'
import Button from 'react-bootstrap/Button';
import { InputText } from 'primereact/inputtext';

const TableHeader = ({isDialogDisplaying, setIsDialogDisplaying, setGlobalFilter, buttonText}) => (
    <div style={{ paddingTop: '15px' }}>
        <div className="d-flex justify-content-start">
            <div style={{ paddingBottom: '10px', paddingLeft:'5px' }}>
                <Button
                    active={isDialogDisplaying}
                    variant="secondary"
                    onClick={() => setIsDialogDisplaying(true)}>
                    <span className="text-light">
                        <i className="fas fa-plus-square" />
                        {` ${buttonText}`}
                    </span>
                </Button>
            </div>  
            <div style={{ paddingLeft: '780px' }}>
                <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
            </div>
        </div>
    </div>
)
export default TableHeader;