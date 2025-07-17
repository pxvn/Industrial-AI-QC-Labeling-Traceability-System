# AI enabled Industrial QC-LABELING-TRACEABILITY Automation System 
### Team Teenage Engineering  
(MENTOR: PROFS. BHARAT TANK)

(RESPECTED EVALUATOR, MY LAPTOP GOT BRICKED AND WE LOST OUR VIDEO FILES AND PHOTOS IN IT SO WE ARE RECREATING OUR DOCUMENTATION FROM SCRATCH. PLEASE CONSIDER OUR REQUEST – WE WILL UPDATE THIS REPO WITH COMPLETE DOCUMENTATION BY EOD.)


FIG 1 :


<img width="3840" height="2160" alt="Designed in FUSION 360 v33" src="https://github.com/user-attachments/assets/3cf75ba8-9bd2-4443-8aac-e6e3b2199bef" />


# Industrial AI QC Labeling and Traceability System

> **Smart PCB Quality Control & Traceability Automation System**  
> A fully automated end-to-end solution for PCB labeling, visual inspection, and product traceability using AI, computer vision, and real-time logging.

## Project Overview

This project is a practical industrial automation system built to streamline the PCB (Printed Circuit Board) manufacturing process. It automatically labels each PCB with a QR code, checks its quality using AI, and logs all data for traceability. The result is a faster, smarter, and more reliable quality control system.

FIG 2 :


<img width="3840" height="2160" alt="Designed in FUSION 360 v33 (1)" src="https://github.com/user-attachments/assets/11132330-cc03-4b58-8259-f796815898d2" />


## Key Features

### **Automated Labeling System**
- Custom-built labeler for applying 1x2 inch QR code stickers
- QR codes are generated with unique serial numbers
- Accurate and repeatable sticker placement using mechanical guides

### **AI-Powered Quality Control**
- Computer vision-based real-time inspection
- OCR (Optical Character Recognition) to read component part numbers
- Pass/Fail status automatically assigned using a machine learning model

### **Product Traceability**
- Complete lifecycle logging for every PCB
- Public verification available at `verify.stromlabs.tech/qrid`
- Firebase database integration for real-time product records
- 24x7 online product verification for customers and admins

###  Homepage : 
- <img width="1920" height="1031" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/cf561873-b736-4c63-b600-31e1dba6cfc6" />


###  Product Verification : 
<img width="1920" height="1033" alt="Screenshot (23)" src="https://github.com/user-attachments/assets/3efe4511-3f16-471d-a2d5-26cbbcec1aad" />


###  Enter ProductId as it is : 
<img width="1920" height="1025" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/bf89006b-040f-4828-a4c4-069cbba35dff" />


###  Product details visible :
<img width="1920" height="1025" alt="Screenshot (25)" src="https://github.com/user-attachments/assets/b0674f00-60eb-4c40-afa2-56311f28c954" />


###  Employee Login :
<img width="1920" height="1031" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/7fa7a57c-423a-4def-9191-def7e83dc98e" />


###  Enter Employee Details properly : 
<img width="1920" height="1026" alt="Screenshot (27)" src="https://github.com/user-attachments/assets/1f257a33-51bd-4f27-a82c-156bfaae1210" />


###  Webiste opens that provides various features which allows employee to perform various tasks or operations on data logs :
<img width="1919" height="1034" alt="Screenshot 2025-07-17 081542" src="https://github.com/user-attachments/assets/4e3b38aa-5439-4fb6-b1ac-63fed819f27e" />


### Webpage that opens on scanningthe QR code given on the product label : 
<img width="1917" height="1029" alt="image" src="https://github.com/user-attachments/assets/8956b16a-6851-4867-9642-3f77a02f0f92" />

#
### **Mechanical Automation**
FIG 3 :


<img width="3840" height="2160" alt="Designed in FUSION 360 v33 (2)" src="https://github.com/user-attachments/assets/f624f2fa-75bf-45d2-9fc9-ed6d71739f2d" />


- Conveyor belt with fine-tuned tension control
- IR sensors detect PCB presence for timing and control
- Raspberry Pi is used for controlling the system and also for loading models that help in image detection for QR and product verification using an camera           connected directly to RPI.


## System Architecture

### **Hardware Components**

|      Component           |         Specification                |       Purpose                               |
|--------------------------|--------------------------------------|---------------------------------------------|
| **Frame**                | MDF Sunboard + 3D Printed Parts      | Structural body of the system               |
| **Conveyor Motor**       | IG32 Motor + Cytron Driver           | Drives the conveyor belt                    |
| **Conveyor Belt**        | Cotton Fabric with ±15mm adjustment  | Moves PCBs across the system                |
| **Structural Support**   | 8mm Steel Rods + Flange Bearings     | Provides mechanical stability               |
| **Processing Units**     | Raspberry Pi 5 + ESP32               | Handles AI, control logic, and sensors      |
| **Vision System**        | RPi2Cam Module (NoIR)                | Captures images for inspection and scanning |
| **Rejection System**     | Servo motor-based actuator           | Redirects faulty PCBs                       |
| **Detection**            | IR Sensor                            | Triggers events when PCB is detected        |


<img width="3840" height="2160" alt="Designed in FUSION 360 v33" src="https://github.com/user-attachments/assets/03496cf3-285d-4f4a-9071-0b7e289b8f0d" />

### **Software Stack**

- **Backend**: Python for model creation , OpenCV for image detection and Firebase for Database management
- **AI/ML**: Custom trained model for PCB detection and TensorFlow or PyTorch for defect detection
- **OCR**: EasyOCR for reading component labels 
- **Database**: Firebase Realtime Database
- **Web Platform**: Hosted on GitHub Pages for now on our custom domain stromlabs.tech
- **Communication**: ESP32 to Raspberry Pi 5 over serial/I2C

## System Workflow

1. **PCB Entry** → Detected by IR sensor  
2. **Conveyor Stops** → Label is applied  
3. **QR Code is Scanned** → Serial number recorded  
4. **AI Quality Inspection**:
    - OCR text verification
    - Visual defect detection
    - Component identification  
5. **Database Logging** → All data stored in Firebase  
6. **Pass/Fail Classification**
7. **Product Routing**:
    - **PASS** → Sent forward on main conveyor
    - **FAIL** → Removed from the converyor belt manually(for now).

## Quality Control Parameters

Each PCB is inspected for the following:

- **Device ID**: Unique product ID assigned 
- **Batch ID**: Tracks production batch for collective product data access
- **Manufacturing Date**: Timestamp for traceability
- **RoHS Compliance**: Environmental compliance status
- **Serial Number**: Encoded in the QR code for direct verification instead of manually entering data
- **Visual Defects**: Detected via custom trained AI model 
- **Component Verification**: Checked using OCR 

## Traceability System

### **Web Verification Platform**
- **URL**: `verify.stromlabs.tech/qrid`
- **Public Access**: Customers can verify their product directly via scanning the QR or manually entering the serial serial number on the verification website.
- **Admin Panel**: See full history and statistics of product data logs and also possible to download data to store on local computer
- **Live Sync**: Firebase keeps all data up to date

### **QR Code Integration**
- Simple scan-to-verify system
- No manual entry of serial numbers
- Full manufacturing history available instantly
- Clean UI for both customer and admin views

## Technical Specifications

### **Mechanical Design**
- **Material**: MDF Sunboard and 3D printed joints
- **Belt System**: Adjustable conveyor with ±15mm tension control
- **Labeling**: High-precision mechanical alignment for precise labeling
- **Rejection System**: Manual for now but can be updated to automatic at later stages.
  
### **Control System**
- **Main Controller**: Raspberry Pi 5
- **Sensor Controller**: ESP32
- **Protocol**: Serial/I2C/SPI communication
- **Software**: Multi-threaded Python application for real-time control

### **AI/ML Capabilities**
- **Image Processing**: Handled by OpenCV (stands for Open Computer Vision) for direct image capturing
- **OCR Engine**: EasyOCR for small text detection 
- **Defect Detection**: Custom-trained CNN (Convolutional Neural Network)
- **Accuracy**: >95% on known PCB defects

## Performance Metrics

- **Speed**: 30–45 seconds per PCB (label + inspection)
- **Label Accuracy**: 90.5% placement precision (Achived Mechnically)
- **Defect Detection**: 95%+ accuracy
- **System Uptime**: 24/7 operation tested
- **Verification Time**: <2 seconds via web

## Applications

- **Electronics Manufacturing**: Real-time QC in assembly lines
- **Automotive Industry**: Component-level traceability
- **Medical Devices**: Regulatory compliance checks
- **Consumer Electronics**: Product authentication
- **Industrial Automation**: Smart factory integration

## Future Enhancements

- **Edge Computing**: Local AI inference to reduce latency
- **Cloud Integration**: Deployment on AWS or Azure
- **Mobile App**: Easy customer-side product scanning
- **Predictive Analytics**: AI to detect failure trends
- **Multi-Product Support**: Configurable for different PCB types
- **Rejection System**: using servo motors for auto removal of defected products.

## Team & Contributions

This project showcases full-stack development in hardware + software:

- Mechanical design and 3D fabrication
- Embedded electronics and automation
- AI model training and image processing
- Database and cloud integration
- Web-based verification platform

## By Pavan Kalsariya & Adarsh Singh
