
exports.ProjectsDetails = (req,res) => {
    const {company_id,employee_id,feature_name,project_id} = req.body;

    if(!feature_name && !project_id) {
        return res.status(400).json({error: "Feature Name or Project Id is required"});
    }

    res.status(200).json({ status: 'OK', data: { company_id, employee_id } });
}

