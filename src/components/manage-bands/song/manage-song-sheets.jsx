import React from 'react'
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux'
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";
import { createStructuredSelector } from 'reselect'
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { selectSelectedSong } from '../../../redux/song/song.selector';

const CustomHeader = ({lyricsCallback, setGlobalFilter, sheetsCallback}) => (
    <div className='container-fluid' style={{ paddingTop: '15px' }}>
        <div className="row align-content-center">
            <div className="col-lg-2" style={{ paddingBottom: '10px' }}>
                <Button
                    variant="success"
                    onClick={lyricsCallback}>
                    <span className="text-light">
                        <i className="fas fa-plus-square" />
                        {` Add Lyrics`}
                    </span>
                </Button>
            </div>
            <div className="col-lg-2" style={{ paddingBottom: '10px' }}>
                <Button
                    variant="success"
                    onClick={sheetsCallback}>
                    <span className="text-light">
                        <i className="fas fa-plus-square" />
                        {` Add Sheet`}
                    </span>
                </Button>
            </div>
            <div style={{ paddingLeft: '550px' }} className="col">
                <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
            </div>
        </div>
    </div>
);

const ManageSongSheets = ({ band, song }) => {
    const history = useHistory();

    const songSheetsFormated = ({ lyrics, sheets }) => ({
        root: [
            {
                key: 0,
                data: {
                    type: 'Lyrics',
                    content: lyrics
                }
            }
        ].concat(sheets.map(
            (sheet, index) => ({
                key: index,
                data: {
                    type: sheet?.instrument,
                    content: sheet?.content
                }
            })
        ))
    });
    const lyricsCallback = () => {
        history.push(`/bands/${band.id}/songs/${song.id}/editor/lyrics`);
    }

    return (
        <TreeTable 
            className="animated faster fadeIn"
            value={songSheetsFormated(song)}
            header={
                <CustomHeader 
                    lyricsCallback={lyricsCallback}/>
                }
            >
            <Column field="name" header="Name" expander />
            <Column field="type" header="Type" />
        </TreeTable>
    )
}

const mapStateToProps = createStructuredSelector({
    band: selectSelectedBand,
    song: selectSelectedSong
})


export default connect(
    mapStateToProps
)(ManageSongSheets);