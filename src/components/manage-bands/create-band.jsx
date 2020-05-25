import React, { useState } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import genreItems from './genre-items';



const selected = (value) => {
    if (value) {

        return (
            <div className="my-multiselected-item-token">
                <span>{value}</span>
            </div>
        );
    }
    else {
        return <span>Select genre</span>
    }
}

const CreateBand = () => {
    const [genres, setGenres] = useState('');
    return (
        <form>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        Upload should be here
                    </div>
                    {/**
                    <div className="form-group">
                        <label className="h6"><strong>Band type</strong></label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                            <label class="form-check-label" for="exampleRadios1">
                                Default radio
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                            <label class="form-check-label" for="exampleRadios2">
                                Second default radio
                            </label>
                        </div>
                    </div>
                     */}
                     Band type should be here unless unnecesary
                </div>
                <div className="col">
                    <div className="form-group">
                        <label className="h6" htmlFor="band-name"><strong>Band name</strong></label>
                        <input type="text" className="form-control" id="band-name" />
                    </div>
                    <div className="form-group">
                        <label className="h6" htmlFor="band-description"><strong>Band description</strong></label>
                        <textarea className="form-control" id="band-description" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="h6 col" htmlFor="band-genres">
                                <strong>Band genres</strong>
                            </label>
                        </div>
                        <div className="row">
                            <div className="col">
                                <MultiSelect
                                    style={{ width: '70%', minWidth: '12em' }}
                                    maxSelectedLabels="10"
                                    placeholder="Select genres"
                                    optionLabel="label"
                                    optionValue="value"
                                    id="Band-genres"
                                    value={genres}
                                    options={genreItems}
                                    onChange={(e) => setGenres(e.value)}
                                    selectedItemTemplate={selected}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateBand;