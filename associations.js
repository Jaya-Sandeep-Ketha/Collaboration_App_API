module.exports = function(models) {
    const { Company, Project, Employee, Feature, Admin, WorksOn, Works } = models;
  
    // Company Associations
    Company.hasMany(Project, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    Company.hasMany(Feature, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
  
    // Project Associations
    Project.belongsTo(Company, {
      foreignKey: 'company_id'
    });
    Project.belongsToMany(Employee, {
      through: Works,
      foreignKey: 'project_id'
    });
    Project.hasMany(Feature, {
      foreignKey: 'project_id'
    });
  
    // Employee Associations
    Employee.belongsToMany(Project, {
      through: Works,
      foreignKey: 'employee_id'
    });
    Employee.belongsToMany(Feature, {
      through: WorksOn,
      foreignKey: 'employee_id'
    });
    Employee.belongsTo(Employee, {
      as: 'ReportsTo',
      foreignKey: 'reports_to'
    });
    Employee.hasMany(Admin, {
      foreignKey: 'employee_id'
    });
  
    // Feature Associations
    Feature.belongsTo(Project, {
      foreignKey: 'project_id'
    });
    Feature.belongsTo(Company, {
      foreignKey: 'company_id'
    });
    Feature.belongsToMany(Employee, {
      through: WorksOn,
      foreignKey: 'feature_id'
    });
  
    // Admin Associations
    Admin.belongsTo(Employee, {
      foreignKey: 'employee_id'
    });
  };