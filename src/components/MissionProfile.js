import React, { useState } from 'react';
import './MissionProfile.css';
import { missions } from './missionsData';

const MissionProfile = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
  };

  const handleBackClick = () => {
    setSelectedMission(null);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setSelectedMission(null); // Clear selected mission when status changes
  };

  const filteredMissions = statusFilter === 'all'
    ? missions
    : missions.filter((mission) => mission.status.toLowerCase() === statusFilter.toLowerCase());

  return (
    <div className="mission-profile">
      <h1 className="profile-heading">Mission Profile</h1>
      
      
      {!selectedMission ? (
        <div className="mission-list">
          {filteredMissions.map((mission) => {
            const statusClass = mission.status ? mission.status.toLowerCase() : 'unknown';
            return (
              <div
                key={mission.id}
                className="mission-card"
                onClick={() => handleMissionClick(mission)}
              >
                <h3>{mission.missionName}</h3>
                <p>{mission.objective}</p>
                <p className={`mission-status ${statusClass}`}>
                  Status: {mission.status || 'Unknown'}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mission-details">
          <button className="back-button" onClick={handleBackClick}>Back</button>
          <h2>{selectedMission.missionName}</h2>
          <p><strong>Objective:</strong> {selectedMission.objective}</p>
          <p><strong>Mission Code:</strong> {selectedMission.missionCode}</p>
          <p><strong>Location:</strong> {selectedMission.location}</p>
          <p><strong>Date:</strong> {selectedMission.date}</p>
          <p><strong>Time:</strong> {selectedMission.time}</p>
          <p><strong>Duration:</strong> {selectedMission.duration}</p>
          <p><strong>Team Members:</strong> {selectedMission.teamMembers}</p>
          <p><strong>Commander:</strong> {selectedMission.commander}</p>
          <p><strong>Specialists:</strong> {selectedMission.specialists}</p>
          <p><strong>Vehicles:</strong> {selectedMission.vehicles}</p>
          <p><strong>Weapons:</strong> {selectedMission.weapons}</p>
          <p><strong>Communication Devices:</strong> {selectedMission.communicationDevices}</p>
          <p><strong>Medical Supplies:</strong> {selectedMission.medicalSupplies}</p>
          <p><strong>Special Equipment:</strong> {selectedMission.specialEquipment}</p>
          <p><strong>Transport Arrangements:</strong> {selectedMission.transportArrangements}</p>
          <p><strong>Accommodation:</strong> {selectedMission.accommodation}</p>
          <p><strong>Food and Water Supply:</strong> {selectedMission.foodWaterSupply}</p>
          <p><strong>Threat Assessment:</strong> {selectedMission.threatAssessment}</p>
          <p><strong>Terrain Analysis:</strong> {selectedMission.terrainAnalysis}</p>
          <p><strong>Surveillance Data:</strong> {selectedMission.surveillanceData}</p>
          <p><strong>Rules of Engagement:</strong> {selectedMission.rulesOfEngagement}</p>
          <p><strong>Emergency Procedures:</strong> {selectedMission.emergencyProcedures}</p>
          <p><strong>Communication Protocols:</strong> {selectedMission.communicationProtocols}</p>
          <p><strong>Risk Assessment:</strong> {selectedMission.riskAssessment}</p>
          <p><strong>Contingency Plans:</strong> {selectedMission.contingencyPlans}</p>
          <p><strong>Permissions and Clearances:</strong> {selectedMission.permissionsClearances}</p>
          <p><strong>Ethical Guidelines:</strong> {selectedMission.ethicalGuidelines}</p>
          <p><strong>Debriefing:</strong> {selectedMission.debriefing}</p>
          <p><strong>Reporting:</strong> {selectedMission.reporting}</p>
          <p><strong>Evaluation:</strong> {selectedMission.evaluation}</p>
          <p><strong>Emergency Contacts:</strong> {selectedMission.emergencyContacts}</p>
          <p><strong>Support Teams:</strong> {selectedMission.supportTeams}</p>
          <p><strong>Documentation:</strong> {selectedMission.documentation}</p>
          <p><strong>Environmental Considerations:</strong> {selectedMission.environmentalConsiderations}</p>
          <p><strong>Status:</strong> {selectedMission.status || 'Unknown'}</p>
        </div>
      )}
    </div>
  );
};

export default MissionProfile;
