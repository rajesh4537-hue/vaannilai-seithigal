#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Tamil Nadu Weather App
Tests all FastAPI endpoints with focus on performance, reliability, and security
"""

import requests
import json
import time
import concurrent.futures
from datetime import datetime
import sys
import os

# Load environment variables
from dotenv import load_dotenv
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://tamilweatherapp.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }
        self.session = requests.Session()
        # Set reasonable timeout
        self.session.timeout = 10
        
    def log_result(self, test_name, success, message="", response_time=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        time_info = f" ({response_time:.2f}ms)" if response_time else ""
        print(f"{status} {test_name}{time_info}")
        if message:
            print(f"    {message}")
        
        if success:
            self.results['passed'] += 1
        else:
            self.results['failed'] += 1
            self.results['errors'].append(f"{test_name}: {message}")
    
    def test_root_endpoint(self):
        """Test GET /api/ - Root health check"""
        try:
            start_time = time.time()
            response = self.session.get(f"{API_BASE}/")
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_result("Root Health Check", True, f"Response: {data}", response_time)
                else:
                    self.log_result("Root Health Check", False, f"Missing 'message' field in response: {data}")
            else:
                self.log_result("Root Health Check", False, f"Status: {response.status_code}, Body: {response.text}")
                
        except Exception as e:
            self.log_result("Root Health Check", False, f"Exception: {str(e)}")
    
    def test_get_status_endpoint(self):
        """Test GET /api/status - Retrieve status checks"""
        try:
            start_time = time.time()
            response = self.session.get(f"{API_BASE}/status")
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("GET Status Endpoint", True, f"Retrieved {len(data)} status checks", response_time)
                else:
                    self.log_result("GET Status Endpoint", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("GET Status Endpoint", False, f"Status: {response.status_code}, Body: {response.text}")
                
        except Exception as e:
            self.log_result("GET Status Endpoint", False, f"Exception: {str(e)}")
    
    def test_post_status_endpoint(self):
        """Test POST /api/status - Create new status check"""
        try:
            payload = {"client_name": "Backend Test User"}
            headers = {"Content-Type": "application/json"}
            
            start_time = time.time()
            response = self.session.post(f"{API_BASE}/status", json=payload, headers=headers)
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "client_name", "timestamp"]
                if all(field in data for field in required_fields):
                    if data["client_name"] == payload["client_name"]:
                        self.log_result("POST Status Endpoint", True, f"Created status check with ID: {data['id']}", response_time)
                        return data["id"]  # Return ID for further testing
                    else:
                        self.log_result("POST Status Endpoint", False, f"Client name mismatch: expected {payload['client_name']}, got {data['client_name']}")
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result("POST Status Endpoint", False, f"Missing fields: {missing}")
            else:
                self.log_result("POST Status Endpoint", False, f"Status: {response.status_code}, Body: {response.text}")
                
        except Exception as e:
            self.log_result("POST Status Endpoint", False, f"Exception: {str(e)}")
        
        return None
    
    def test_invalid_post_request(self):
        """Test POST /api/status with invalid payload"""
        try:
            # Test with missing required field
            payload = {"invalid_field": "test"}
            headers = {"Content-Type": "application/json"}
            
            response = self.session.post(f"{API_BASE}/status", json=payload, headers=headers)
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_result("Invalid POST Request Handling", True, "Correctly rejected invalid payload with 422")
            elif response.status_code >= 400:
                self.log_result("Invalid POST Request Handling", True, f"Correctly rejected with status {response.status_code}")
            else:
                self.log_result("Invalid POST Request Handling", False, f"Should have rejected invalid payload, got status: {response.status_code}")
                
        except Exception as e:
            self.log_result("Invalid POST Request Handling", False, f"Exception: {str(e)}")
    
    def test_cors_headers(self):
        """Test CORS headers for frontend integration"""
        try:
            response = self.session.options(f"{API_BASE}/status")
            headers = response.headers
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            present_headers = [h for h in cors_headers if h in headers]
            
            if len(present_headers) >= 2:  # At least origin and methods should be present
                self.log_result("CORS Headers", True, f"Found headers: {present_headers}")
            else:
                self.log_result("CORS Headers", False, f"Missing CORS headers. Found: {present_headers}")
                
        except Exception as e:
            self.log_result("CORS Headers", False, f"Exception: {str(e)}")
    
    def test_https_enforcement(self):
        """Test HTTPS enforcement"""
        if BACKEND_URL.startswith('https://'):
            self.log_result("HTTPS Enforcement", True, "Backend URL uses HTTPS")
        else:
            self.log_result("HTTPS Enforcement", False, f"Backend URL not using HTTPS: {BACKEND_URL}")
    
    def test_response_format(self):
        """Test JSON response formats"""
        try:
            response = self.session.get(f"{API_BASE}/")
            content_type = response.headers.get('content-type', '')
            
            if 'application/json' in content_type:
                try:
                    response.json()  # Try to parse JSON
                    self.log_result("JSON Response Format", True, "Valid JSON response")
                except json.JSONDecodeError:
                    self.log_result("JSON Response Format", False, "Invalid JSON in response")
            else:
                self.log_result("JSON Response Format", False, f"Content-Type: {content_type}")
                
        except Exception as e:
            self.log_result("JSON Response Format", False, f"Exception: {str(e)}")
    
    def test_performance_load(self):
        """Test performance under concurrent load"""
        def make_request():
            try:
                start = time.time()
                response = self.session.get(f"{API_BASE}/")
                end = time.time()
                return (response.status_code == 200, (end - start) * 1000)
            except:
                return (False, 0)
        
        try:
            # Test with 10 concurrent requests
            with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
                futures = [executor.submit(make_request) for _ in range(10)]
                results = [future.result() for future in concurrent.futures.as_completed(futures)]
            
            successful = sum(1 for success, _ in results if success)
            response_times = [rt for success, rt in results if success]
            
            if successful >= 8:  # At least 80% success rate
                avg_time = sum(response_times) / len(response_times) if response_times else 0
                self.log_result("Performance Load Test", True, f"{successful}/10 requests successful, avg: {avg_time:.2f}ms")
            else:
                self.log_result("Performance Load Test", False, f"Only {successful}/10 requests successful")
                
        except Exception as e:
            self.log_result("Performance Load Test", False, f"Exception: {str(e)}")
    
    def test_database_persistence(self):
        """Test database operations and persistence"""
        try:
            # Create a status check
            test_client = f"DB_Test_User_{int(time.time())}"
            payload = {"client_name": test_client}
            
            # POST request
            post_response = self.session.post(f"{API_BASE}/status", json=payload)
            if post_response.status_code != 200:
                self.log_result("Database Persistence", False, f"Failed to create record: {post_response.status_code}")
                return
            
            created_record = post_response.json()
            created_id = created_record.get("id")
            
            # Wait a moment then GET to verify persistence
            time.sleep(0.5)
            get_response = self.session.get(f"{API_BASE}/status")
            
            if get_response.status_code == 200:
                all_records = get_response.json()
                found_record = next((r for r in all_records if r.get("id") == created_id), None)
                
                if found_record and found_record.get("client_name") == test_client:
                    self.log_result("Database Persistence", True, f"Record persisted successfully with ID: {created_id}")
                else:
                    self.log_result("Database Persistence", False, f"Created record not found in GET response")
            else:
                self.log_result("Database Persistence", False, f"Failed to retrieve records: {get_response.status_code}")
                
        except Exception as e:
            self.log_result("Database Persistence", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for: {API_BASE}")
        print("=" * 60)
        
        # Core API Endpoints
        print("\n📡 Core API Endpoints:")
        self.test_root_endpoint()
        self.test_get_status_endpoint()
        self.test_post_status_endpoint()
        
        # Error Handling
        print("\n🛡️ Error Handling:")
        self.test_invalid_post_request()
        
        # Security & Headers
        print("\n🔒 Security & Headers:")
        self.test_cors_headers()
        self.test_https_enforcement()
        self.test_response_format()
        
        # Performance & Database
        print("\n⚡ Performance & Database:")
        self.test_performance_load()
        self.test_database_persistence()
        
        # Summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary:")
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        
        if self.results['errors']:
            print(f"\n🚨 Failed Tests:")
            for error in self.results['errors']:
                print(f"  • {error}")
        
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print(f"\n🎉 All tests passed! Backend is ready for production.")
        sys.exit(0)
    else:
        print(f"\n⚠️ Some tests failed. Please review the issues above.")
        sys.exit(1)