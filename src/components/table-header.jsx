import React from 'react'
import Button from 'react-bootstrap/Button';
import { InputText } from 'primereact/inputtext';

const TableHeader = ({isDialogDisplaying, setIsDialogDisplaying, setGlobalFilter, buttonText}) => (
    <div className='container-fluid' style={{ paddingTop: '15px' }}>
        <div className="row align-content-center">
            <div className="col-lg-2" style={{ paddingBottom: '10px' }}>
                <Button
                    active={isDialogDisplaying}
                    variant="success"
                    onClick={() => setIsDialogDisplaying(true)}>
                    <span className="text-light">
                        <i className="fas fa-plus-square" />
                        {` ${buttonText}`}
                    </span>
                </Button>
            </div>
            <div style={{ paddingLeft: '750px' }} className="col">
                <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
            </div>
        </div>
    </div>
)
export default TableHeader;