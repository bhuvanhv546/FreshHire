import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">

      <h2 className="text-2xl font-bold">
        {company.name}
      </h2>

      <p className="mt-2 text-green-600">
        {company.hiringStatus}
      </p>

      <h3 className="font-semibold mt-4">
        Roles
      </h3>

      <ul className="list-disc pl-6">
        {company.roles?.map((role, i) => (
          <li key={i}>{role}</li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4">
        Skills Required
      </h3>

      <ul className="list-disc pl-6">
        {company.skills?.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>

    </div>
  );
};

export default CompanyCard;