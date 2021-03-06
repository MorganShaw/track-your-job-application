module.exports = {
    //On the front end, define what information you need.
    //Get jobs works in Postman. 
    getJobs: async (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        console.log('req.params in get jobs', req.params)

        const jobs = await db.jobs.get_jobs(userId)
        // Another option that adds error handling: 
        //db.jobs.get_jobs(userId).then(jobs=> {
            // res.status....
        // }).catch....
        if(jobs){
            res.status(200).send(jobs);
        } else {
            res.status(404).send("Error in the server request.")
        }
    },
    //This seems to work in postman.
    getOneJob: async (req, res) => {
        const db = req.app.get('db');
        const {userId, jobId} = req.params;
        console.log('getOneJob method userId and jobId', req.params, userId, jobId)
        const job = await db.jobs.get_job([userId, jobId]);
        res.status(200).send(job[0]);
    },
    //this now works in postman. Do job_status_id in a separate endpoint.
    //Now this isn't working in postman. I don't know why. It's making the job title the jobId and the userId undefined. 
    editJob: async (req, res) => {
        const {title, location, url, datePosted, description, notes, jobStatusId, company, contact} = req.body;
        const {userId, jobId} = req.params; 
        console.log('edit jobs req.params ', req.params)
        console.log('edit job each property log',
            title, location, company, url, datePosted, description, notes, contact, jobStatusId, userId, jobId)
        const db = req.app.get('db');
        //Defaults as an array if you don't put brackets.
        //This dictates the order of the variables ($1, etc.) in the .sql file.
        const jobs = await db.jobs.edit_job([
            // jobId,
            // userId,
            title,
            location,
            url,
            datePosted,
            description,
            notes,
            jobStatusId,
            company,
            contact,
            userId,
            jobId
            
        ])
        if(jobs){
            res.status(200).send(jobs);
        } else {
            res.status(404).send("Error in the server request.")
        }
    },

    deleteJob: async (req, res) => {
        const {jobId, userId} = req.params;        
        console.log('Delete job req.params', req.params)
        const db = req.app.get('db');
        const jobs = await db.jobs.delete_job([jobId, userId])
        if(jobs){
            res.status(200).send(jobs);
        } else {
            res.status(500).send("Error in the server request.")
        }
    },

    addJob: async (req, res) => {
        const {title, location, url, datePosted, description, notes, jobStatusId, company, contact} = req.body;
        const {userId} = req.params; 
        console.log('addjob req.params', req.params)
        console.log('addjob each property',
            title, location, company, url, datePosted, description, notes, contact, jobStatusId, userId)
        const db = req.app.get('db');
        //Put in object if you want the order of the variables not to matter. Leave as array otherwise. If you do use an object, though, change the .sql file to insert values as ${columnName}. When it was an object and I didn't have the variable names formatted like that, it caused an error: "there is no parameter $1."
    
        const jobs = await db.jobs.add_job([
            title,
            location,
            company,
            url,
            datePosted,
            description,
            notes,
            contact,
            jobStatusId,
            userId
        ])
        if(jobs){
            res.status(200).send(jobs);
        } else {
            res.status(404).send("Error in the server request.")
        }
    }
}

// UPDATE jobs
// SET 
// location = $1,
// url = $2,
// date_posted = $3,
// description = $4,
// notes = $5,
// job_status_id = $6,
// company = $7,
// contact = $8
// WHERE job_id = $9 AND user_id = $10;