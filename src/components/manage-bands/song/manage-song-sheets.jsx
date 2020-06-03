import React from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux'
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";
import { createStructuredSelector } from 'reselect'
import { selectSelectedBand } from '../../../redux/band/band.selector';
import { selectSelectedSong } from '../../../redux/song/song.selector';

const CustomHeader = ({ lyricsCallback, setGlobalFilter, chordsCallback, isLyricsEdition, isChordsEdition }) => (
    <div style={{ paddingTop: '15px' }}>
        <div className="d-flex flex-row justify-content-start">
            <div style={{ paddingBottom: '10px', marginRight: '10px' }}>
                <Button
                    variant="secondary"
                    onClick={lyricsCallback}>
                    <span className="text-light">
                        {isLyricsEdition ? <i className="fas fa-edit" /> : <i className="fas fa-plus-square" />}
                        {` ${isLyricsEdition ? 'Edit' : 'Add'} Lyrics`}
                    </span>
                </Button>
            </div>
            <div>
                <Button
                    variant="secondary"
                    onClick={chordsCallback}>
                    <span className="text-light">
                        {isChordsEdition ? <i className="fas fa-edit" /> : <i className="fas fa-plus-square" />}
                        {` ${isChordsEdition ? 'Edit' : 'Add'} Chords`}
                    </span>
                </Button>
            </div>
            <div style={{ paddingLeft: '600px' }}>
                <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
            </div>
        </div>
    </div>
);

const ManageSongSheets = ({ band, song }) => {
    const history = useHistory();



    const songSheetsFormated = ({ lyrics, sheets, chords }) => {
        let formatedSheets = [{ key: '2-0', data: { name: 'No sheets' } }];
        if (!sheets) {
            formatedSheets = sheets.map((sheet, index) => (
                {
                    key: `2-${index}`,
                    data: {
                        name: sheet?.intrument,
                        type: sheet?.instrument,
                        content: sheet?.content
                    }
                }));
        }
        console.log(formatedSheets);
        return {
            root: [
                {
                    key: 0,
                    data: {
                        name: 'Lyrics',
                        type: 'Lyrics',
                        content: lyrics
                    }
                },
                {
                    key: 1,
                    data: {
                        name: 'Chords',
                        type: 'Chords',
                        content: chords
                    }
                },
                {
                    key: 2,
                    data: {
                        name: 'Sheets',
                        type: 'All sheets'
                    },
                    children: formatedSheets
                }
            ]
        };
    }

    const lyricsCallback = () => {
        history.push(`/bands/${band.id}/songs/${song.id}/editor/lyrics`);
    }

    const chordsCallback = () => {
        history.push(`/bands/${band.id}/songs/${song.id}/editor/chords`);
    }

    return (
        <TreeTable
            className="animated faster fadeIn"
            value={songSheetsFormated(song).root}
            header={
                <CustomHeader
                    lyricsCallback={lyricsCallback}
                    chordsCallback={chordsCallback}
                    isLyricsEdition={song.lyrics}
                    isChordsEdition={song.chords} />
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