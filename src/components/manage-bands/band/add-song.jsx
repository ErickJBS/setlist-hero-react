import React from 'react'

const AddSong = ({ callback }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO things
        callback();
    }
    return (
        <form>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" />
                </div>
            </div>
            <div class="form-group row">
                <div className="col-9" />
                <div className="col" style={{ paddingLeft: '27px' }}>
                    <button type="submit" className="btn btn-success mb-2" onClick={handleSubmit}>Submit</button>{' '}
                    <button type="button" className="btn btn-secondary mb-2" onClick={callback}>Cancel</button>
                </div>
            </div>
        </form>
    )
}
export default AddSong;