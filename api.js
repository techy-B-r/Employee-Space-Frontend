const API_BASE_URL = 'http://localhost:8080/api';

class API {
    static getToken() {
        return localStorage.getItem('token');
    }

    static getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
        };
    }

    // Auth Endpoints
    static async login(username, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        return response.json();
    }

    static async validateToken(token) {
        const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.ok;
    }

    // Employee Endpoints
    static async getEmployees() {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    static async getEmployee(id) {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    static async createEmployee(employeeData) {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(employeeData)
        });
        return response.json();
    }

    static async updateEmployee(id, employeeData) {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(employeeData)
        });
        return response.json();
    }

    static async deleteEmployee(id) {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return response.ok;
    }

    // Department Endpoints
    static async getDepartments() {
        const response = await fetch(`${API_BASE_URL}/departments`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    static async createDepartment(deptData) {
        const response = await fetch(`${API_BASE_URL}/departments`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(deptData)
        });
        return response.json();
    }

    // Attendance Endpoints
    static async getAttendance(employeeId, date) {
        const response = await fetch(
            `${API_BASE_URL}/attendance?employeeId=${employeeId}&date=${date}`,
            { headers: this.getHeaders() }
        );
        return response.json();
    }

    static async recordAttendance(attendanceData) {
        const response = await fetch(`${API_BASE_URL}/attendance`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(attendanceData)
        });
        return response.json();
    }

    // Leave Endpoints
    static async getLeaves(employeeId) {
        const response = await fetch(`${API_BASE_URL}/leaves?employeeId=${employeeId}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    static async applyLeave(leaveData) {
        const response = await fetch(`${API_BASE_URL}/leaves`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(leaveData)
        });
        return response.json();
    }

    static async approveLeave(leaveId) {
        const response = await fetch(`${API_BASE_URL}/leaves/${leaveId}/approve`, {
            method: 'PUT',
            headers: this.getHeaders()
        });
        return response.json();
    }

    // Complaint Endpoints
    static async getComplaints() {
        const response = await fetch(`${API_BASE_URL}/complaints`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    static async fileComplaint(complaintData) {
        const response = await fetch(`${API_BASE_URL}/complaints`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(complaintData)
        });
        return response.json();
    }

    // Meeting Endpoints
    static async getMeetings() {
        const response = await fetch(`${API_BASE_URL}/meetings`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    static async createMeeting(meetingData) {
        const response = await fetch(`${API_BASE_URL}/meetings`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(meetingData)
        });
        return response.json();
    }
}