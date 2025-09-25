#!/bin/bash

echo "🧪 Running Quick JMeter Test..."

cd /app/jmeter-tests
export JMETER_HOME="/app/apache-jmeter-5.6.3"

# Run just a quick test of the backend endpoint (1 user, 1 loop)
${JMETER_HOME}/bin/jmeter -n -t weather-app-load-test.jmx \
  -Jjmeter.threads=1 \
  -Jjmeter.loops=1 \
  -l quick-test-results.jtl \
  -j quick-test.log

echo ""
echo "📋 Quick Test Results:"
if [ -f "quick-test-results.jtl" ]; then
    echo "Total requests: $(grep -c ',' quick-test-results.jtl)"
    echo "Success rate: $(awk -F',' 'NR>1 && $8 == "true" {success++} END {printf "%.1f%% (%d/%d)", (success/(NR-1))*100, success, NR-1}' quick-test-results.jtl)"
    echo ""
    echo "Sample results:"
    head -3 quick-test-results.jtl
fi