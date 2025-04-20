import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function CriminalRiskForm() {
  const [formData, setFormData] = useState({
    requestDate: "",
    consentGiven: true,
    witnessName: "",
    witnessSignature: "",
    unconsented: false,
    firstName: "",
    secondName: "",
    lastName: "",
    dob: "",
    gender: "",
    otherLastNames: "",
    akaNames: "",
    address: "",
    phone1: "",
    phone2: "",
    placeOfBirth: "",
    driversLicense: "",
    agencyName: "",
    reason: "",
    worker: "",
    lastAssessmentDate: "",
    designate: "",
    designatePhone: "",
    designateEmail: "",
    designateFax: "",
    finalRequestDate: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([formData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FormData");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "CriminalRiskAssessment.xlsx");
  };

  return (
    <div className="container">
      <h1>Criminal Risk Assessment Request</h1>

      <label>Date of Request</label>
      <input type="date" name="requestDate" value={formData.requestDate} onChange={handleChange} required />

      <label>
        <input type="checkbox" name="consentGiven" checked={formData.consentGiven} onChange={handleChange} /> Consent Given?
      </label>

      {!formData.consentGiven && (
        <label>
          <input type="checkbox" name="unconsented" checked={formData.unconsented} onChange={handleChange} /> Unconsented
        </label>
      )}

      {formData.consentGiven && (
        <>
          <label>Witness Name</label>
          <input name="witnessName" value={formData.witnessName} onChange={handleChange} />
          <label>Witness Signature</label>
          <input name="witnessSignature" value={formData.witnessSignature} onChange={handleChange} />
        </>
      )}

      <label>First Name</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} required />

      <label>Second Name</label>
      <input name="secondName" value={formData.secondName} onChange={handleChange} />

      <label>Last Name</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} required />

      <label>Date of Birth</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

      <label>Gender</label>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label>Other Last Names Used</label>
      <input name="otherLastNames" value={formData.otherLastNames} onChange={handleChange} />

      <label>Also Known As</label>
      <input name="akaNames" value={formData.akaNames} onChange={handleChange} />

      <label>Current Address</label>
      <textarea name="address" value={formData.address} onChange={handleChange} required />

      <label>Phone 1</label>
      <input name="phone1" value={formData.phone1} onChange={handleChange} required />

      <label>Phone 2</label>
      <input name="phone2" value={formData.phone2} onChange={handleChange} />

      <label>Place of Birth</label>
      <input name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} required />

      <label>Driver's License Number</label>
      <input name="driversLicense" value={formData.driversLicense} onChange={handleChange} />

      <label>Agency Submitting Request</label>
      <input name="agencyName" value={formData.agencyName} onChange={handleChange} required />

      <label>Reason for Risk Assessment</label>
      <textarea name="reason" value={formData.reason} onChange={handleChange} required />

      <label>Assigned Worker</label>
      <input name="worker" value={formData.worker} onChange={handleChange} />

      <label>Date of Last Risk Assessment</label>
      <input type="date" name="lastAssessmentDate" value={formData.lastAssessmentDate} onChange={handleChange} />

      <label>Submitting Designate</label>
      <input name="designate" value={formData.designate} onChange={handleChange} required />

      <label>Designate Phone</label>
      <input name="designatePhone" value={formData.designatePhone} onChange={handleChange} required />

      <label>Designate Email</label>
      <input type="email" name="designateEmail" value={formData.designateEmail} onChange={handleChange} required />

      <label>Designate Fax</label>
      <input name="designateFax" value={formData.designateFax} onChange={handleChange} />

      <label>Final Request Date</label>
      <input type="date" name="finalRequestDate" value={formData.finalRequestDate} onChange={handleChange} required />

      <div className="buttons">
        <button onClick={handlePrint}>Print Form</button>
        <button onClick={handleExportToExcel}>Export to Excel</button>
      </div>
    </div>
  );
}