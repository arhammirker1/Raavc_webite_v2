// Google Apps Script Code for Direct Sheet Submission
// Copy this code to Google Apps Script and deploy as web app

function doPost(e) {
  try {
    // Log the incoming data for debugging
    console.log('=== NEW REQUEST ===');
    console.log('Received data:', JSON.stringify(e));
    console.log('Parameters:', JSON.stringify(e.parameter));
    console.log('Post data:', JSON.stringify(e.postData));
    
    let formType, rowData = [];
    const timestamp = new Date();
    
    // Check if it's JSON data (all forms now use JSON)
    if (e.postData && e.postData.contents) {
      console.log('Processing JSON data...');
      console.log('postData type:', e.postData.type);
      console.log('postData length:', e.postData.length);
      
      try {
        const data = JSON.parse(e.postData.contents);
        
        
        // Regular form submission
        formType = data.formType;
        const formData = data.data;
        console.log('Processing JSON for:', formType);
        
        if (formType === 'job_application') {
          // Create clickable link for CV Drive Link
          let cvDriveLink = 'No CV link provided';
          if (formData.cvDriveLink && formData.cvDriveLink.trim() !== '') {
            cvDriveLink = `=HYPERLINK("${formData.cvDriveLink}", "View CV")`;
          }
          
          rowData = [
            timestamp,
            formData.name || 'NO_NAME',
            formData.email || 'NO_EMAIL',
            formData.phone || 'NO_PHONE',
            formData.message || 'NO_MESSAGE',
            cvDriveLink
          ];
          console.log('Job application row data:', rowData);
        } else if (formType === 'evaluation_request') {
          rowData = [
            timestamp,
            formData.requestType,
            formData.evaluationPurpose,
            formData.otherPurpose,
            formData.name,
            formData.email,
            formData.phone,
            formData.propertyType,
            formData.propertyArea,
            formData.propertyLocation,
            formData.generalDescription
          ];
        } else if (formType === 'cooperation') {
          rowData = [
            timestamp,
            formData.companyName,
            formData.email,
            formData.phoneNumber,
            formData.topic,
            formData.message
          ];
        }
      } catch (jsonError) {
        console.log('JSON parsing error:', jsonError);
        throw new Error('Failed to parse JSON data: ' + jsonError.toString());
      }
    } else {
      console.log('No valid data found in request');
      console.log('e.parameter:', e.parameter);
      console.log('e.postData:', e.postData);
      throw new Error('No valid data found in request');
    }
    
    if (!formType) {
      throw new Error('No form type found in request');
    }
    
    console.log('Form type:', formType);
    console.log('Row data to add:', rowData);
    
    // Get the appropriate sheet
    const sheet = getSheet(formType);
    console.log('Sheet found:', sheet.getName());
    
    // Add data to sheet
    console.log('Attempting to add row to sheet...');
    sheet.appendRow(rowData);
    console.log('Row added successfully!');
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data added to sheet', formType: formType}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('=== ERROR IN doPost ===');
    console.error('Error details:', error.toString());
    console.error('Stack trace:', error.stack);
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  // Handle preflight requests for CORS
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}


function getSheet(formType) {
  // Replace with your actual Google Sheet ID
  const SHEET_ID = '1IcJNyWjc5iulDaIK57OJS3HK9vKU9LtAxyOi_OKqFAA';
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  
  console.log('Available sheets:', spreadsheet.getSheets().map(s => s.getName()));
  
  let sheet;
  if (formType === 'job_application') {
    sheet = spreadsheet.getSheetByName('Job Applications');
    if (!sheet) {
      console.log('Job Applications sheet not found, creating it...');
      sheet = spreadsheet.insertSheet('Job Applications');
      // Set headers
      sheet.getRange(1, 1, 1, 6).setValues([[
        'Timestamp', 'Name', 'Email', 'Phone', 'Message', 'CV Drive Link'
      ]]);
    }
  } else if (formType === 'evaluation_request') {
    sheet = spreadsheet.getSheetByName('Evaluation Requests');
    if (!sheet) {
      console.log('Evaluation Requests sheet not found, creating it...');
      sheet = spreadsheet.insertSheet('Evaluation Requests');
    }
  } else if (formType === 'cooperation') {
    sheet = spreadsheet.getSheetByName('Cooperation Requests');
    if (!sheet) {
      console.log('Cooperation Requests sheet not found, creating it...');
      sheet = spreadsheet.insertSheet('Cooperation Requests');
    }
  }
  
  if (!sheet) {
    throw new Error('Unknown form type: ' + formType);
  }
  
  return sheet;
}

function testAddData() {
  // Test function to manually add data to sheet
  try {
    console.log('=== TESTING DATA ADDITION ===');
    const SHEET_ID = '1IcJNyWjc5iulDaIK57OJS3HK9vKU9LtAxyOi_OKqFAA';
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('Spreadsheet opened:', spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName('Job Applications');
    if (!sheet) {
      console.log('Creating Job Applications sheet...');
      sheet = spreadsheet.insertSheet('Job Applications');
      // Set headers
      sheet.getRange(1, 1, 1, 6).setValues([[
        'Timestamp', 'Name', 'Email', 'Phone', 'Message', 'CV Drive Link'
      ]]);
    }
    
    console.log('Sheet found:', sheet.getName());
    console.log('Current row count:', sheet.getLastRow());
    
    // Add test data
    const testData = [
      new Date(),
      'Test Name',
      'test@email.com',
      '1234567890',
      'Test message',
      '=HYPERLINK("https://drive.google.com/file/d/test123/view", "View CV")'
    ];
    
    console.log('Adding test data:', testData);
    sheet.appendRow(testData);
    console.log('Test data added successfully!');
    console.log('New row count:', sheet.getLastRow());
    
    return 'Test completed successfully';
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}


function setupSheets() {
  // This function sets up the sheets with proper headers
  const SHEET_ID = '1IcJNyWjc5iulDaIK57OJS3HK9vKU9LtAxyOi_OKqFAA';
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  
  // Create Job Applications sheet
  let sheet = spreadsheet.getSheetByName('Job Applications');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Job Applications');
  }
  
  // Set headers for Job Applications
  sheet.getRange(1, 1, 1, 6).setValues([[
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Message',
    'CV Drive Link'
  ]]);
  
  // Create Evaluation Requests sheet
  sheet = spreadsheet.getSheetByName('Evaluation Requests');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Evaluation Requests');
  }
  
  // Set headers for Evaluation Requests
  sheet.getRange(1, 1, 1, 11).setValues([[
    'Timestamp',
    'Request Type',
    'Evaluation Purpose',
    'Other Purpose',
    'Name',
    'Email',
    'Phone',
    'Property Type',
    'Property Area',
    'Property Location',
    'General Description'
  ]]);
  
  // Create Cooperation Requests sheet
  sheet = spreadsheet.getSheetByName('Cooperation Requests');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Cooperation Requests');
  }
  
  // Set headers for Cooperation Requests
  sheet.getRange(1, 1, 1, 6).setValues([[
    'Timestamp',
    'Company Name',
    'Email',
    'Phone',
    'Topic',
    'Message'
  ]]);
  
  // Format headers for all sheets
  const sheets = ['Job Applications', 'Evaluation Requests', 'Cooperation Requests'];
  sheets.forEach(sheetName => {
    const currentSheet = spreadsheet.getSheetByName(sheetName);
    if (currentSheet) {
      const headerRange = currentSheet.getRange(1, 1, 1, currentSheet.getLastColumn());
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
    }
  });
}
