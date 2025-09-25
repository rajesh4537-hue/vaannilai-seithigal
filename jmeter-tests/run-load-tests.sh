#!/bin/bash

# Weather App JMeter Load Testing Script
# Author: Emergent AI Agent
# Purpose: Execute comprehensive load tests for Tamil Nadu Weather App

echo "🚀 Starting JMeter Load Testing for Weather App..."
echo "=============================================="

# Set JMeter home
export JMETER_HOME="/app/apache-jmeter-5.6.3"
export PATH="$JMETER_HOME/bin:$PATH"

# Create results directory
mkdir -p /app/jmeter-tests/results
cd /app/jmeter-tests

echo "📋 Test Configuration:"
echo "- Backend URL: https://tamilweatherapp.preview.emergentagent.com"
echo "- Weather API: WeatherAPI.com (with real key)"
echo "- JMeter Version: $(${JMETER_HOME}/bin/jmeter --version | head -1)"

echo ""
echo "🔬 Test 1: Load Testing (10 users, 5 loops)"
echo "----------------------------------------------"
${JMETER_HOME}/bin/jmeter -n -t weather-app-load-test.jmx \
  -l results/load-test-results.jtl \
  -e -o results/load-test-report \
  -j results/load-test.log

if [ $? -eq 0 ]; then
    echo "✅ Load test completed successfully"
    echo "📊 Report generated: results/load-test-report/"
else
    echo "❌ Load test failed"
fi

echo ""
echo "⚡ Test 2: Stress Testing (50 users, 3 loops)"  
echo "-----------------------------------------------"
${JMETER_HOME}/bin/jmeter -n -t weather-app-stress-test.jmx \
  -l results/stress-test-results.jtl \
  -e -o results/stress-test-report \
  -j results/stress-test.log

if [ $? -eq 0 ]; then
    echo "✅ Stress test completed successfully"
    echo "📊 Report generated: results/stress-test-report/"
else
    echo "❌ Stress test failed"
fi

echo ""
echo "📋 Test Summary:"
echo "=================="
echo "Load Test Results:"
if [ -f "results/load-test-results.jtl" ]; then
    echo "- Total requests: $(grep -c ',' results/load-test-results.jtl)"
    echo "- Success rate: $(awk -F',' '$8 == "true" {success++} END {printf "%.1f%%", (success/NR)*100}' results/load-test-results.jtl)"
    echo "- Average response time: $(awk -F',' '{sum+=$2; count++} END {printf "%.0fms", sum/count}' results/load-test-results.jtl)"
fi

echo ""
echo "Stress Test Results:"
if [ -f "results/stress-test-results.jtl" ]; then
    echo "- Total requests: $(grep -c ',' results/stress-test-results.jtl)"
    echo "- Success rate: $(awk -F',' '$8 == "true" {success++} END {printf "%.1f%%", (success/NR)*100}' results/stress-test-results.jtl)"
    echo "- Average response time: $(awk -F',' '{sum+=$2; count++} END {printf "%.0fms", sum/count}' results/stress-test-results.jtl)"
fi

echo ""
echo "📁 Generated Files:"
echo "- results/load-test-results.jtl"
echo "- results/stress-test-results.jtl"
echo "- results/load-test-report/ (HTML dashboard)"
echo "- results/stress-test-report/ (HTML dashboard)"
echo ""
echo "🎯 Load testing completed! Check the results directory for detailed reports."