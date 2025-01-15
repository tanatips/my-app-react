const fs = require('fs');
const fetch = require('node-fetch');

async function generateInsertStatements() {
    try {
        // ดึงข้อมูลจาก URL
        const response = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json');
        const data = await response.json();
        
        let insertStatements = '';
        
        // Generate INSERT statements for provinces
        data.forEach(province => {
            insertStatements += `INSERT INTO cgd_province_master (id, name_th, name_en) VALUES (${province.id}, '${province.name_th.replace(/'/g, "''")}', '${province.name_en.replace(/'/g, "''")}');\n`;
            
            // Generate INSERT statements for amphures
            province.amphure.forEach(amphure => {
                insertStatements += `INSERT INTO cgd_amphur_master (id, name_th, name_en, province_id) VALUES (${amphure.id}, '${amphure.name_th.replace(/'/g, "''")}', '${amphure.name_en.replace(/'/g, "''")}', ${province.id});\n`;
                
                // Generate INSERT statements for tambons
                amphure.tambon.forEach(tambon => {
                    insertStatements += `INSERT INTO cgd_tambon_master (id, name_th, name_en, amphur_id, zipcode) VALUES (${tambon.id}, '${tambon.name_th.replace(/'/g, "''")}', '${tambon.name_en.replace(/'/g, "''")}', ${amphure.id}, '${tambon.zipcode}');\n`;
                });
            });
        });
        
        // เขียนไฟล์ SQL
        fs.writeFileSync('cgd_thai_address_master_data.sql', insertStatements);
        console.log('SQL file generated successfully!');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

generateInsertStatements();