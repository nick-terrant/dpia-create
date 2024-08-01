let dpias = [];
let currentDPIA = null;

function createNewDPIA() {
    const newDPIA = { id: Date.now(), status: 'draft' };
    dpias.push(newDPIA);
    updateDPIAList();
}

function updateDPIAList() {
    const listElement = document.getElementById('dpiaListItems');
    listElement.innerHTML = '';
    dpias.forEach(dpia => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = `DPIA ${dpia.id} - ${dpia.status}`;
        button.onclick = () => showDPIAStep1(dpia);
        li.appendChild(button);
        listElement.appendChild(li);
    });
}

function showDPIAStep1(dpia) {
    currentDPIA = dpia;
    document.getElementById('dpiaList').style.display = 'none';
    const step1Element = document.getElementById('dpiaStep1');
    step1Element.style.display = 'block';
    step1Element.innerHTML = `
        <h2>Step 1: Understanding Your Project</h2>
        <form id="dpiaStep1Form">
            <div class="form-section">
                <h3>1. What are you trying to achieve?</h3>
                <p class="explanation">Describe the main goals of your project in simple terms.</p>
                <textarea id="projectAims" required></textarea>
            </div>
            <div class="form-section">
                <h3>2. How will you handle personal data?</h3>
                <p class="explanation">Select all that apply:</p>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="dataHandling" value="collect"> Collect new data</label>
                    <label><input type="checkbox" name="dataHandling" value="use"> Use existing data</label>
                    <label><input type="checkbox" name="dataHandling" value="share"> Share data with others</label>
                    <label><input type="checkbox" name="dataHandling" value="store"> Store data</label>
                    <label><input type="checkbox" name="dataHandling" value="delete"> Delete data</label>
                </div>
            </div>
            <div class="form-section">
                <h3>3. Why are you processing this data?</h3>
                <p class="explanation">Choose the main purpose(s) for handling this data:</p>
                <select id="processingPurpose" multiple required>
                    <option value="legal_obligation">To comply with a law</option>
                    <option value="contract">To fulfill a contract</option>
                    <option value="legitimate_interests">For our legitimate business interests</option>
                    <option value="consent">With the individual's consent</option>
                    <option value="vital_interests">To protect someone's life</option>
                    <option value="public_task">To perform a public task</option>
                </select>
            </div>
            <div class="form-section">
                <h3>4. Why is a DPIA needed?</h3>
                <p class="explanation">Explain briefly why you think this project requires a DPIA. If you're not sure, select "I'm not sure" and we'll help you determine if it's necessary.</p>
                <textarea id="dpiaJustification"></textarea>
                <label><input type="checkbox" id="notSureDPIA"> I'm not sure if a DPIA is needed</label>
            </div>
            <button type="submit">Continue to Next Step</button>
        </form>
    `;
    document.getElementById('dpiaStep1Form').onsubmit = handleStep1Submit;
}

function handleStep1Submit(e) {
    e.preventDefault();
    const formData = {
        projectAims: document.getElementById('projectAims').value,
        dataHandling: Array.from(document.querySelectorAll('input[name="dataHandling"]:checked')).map(el => el.value),
        processingPurpose: Array.from(document.getElementById('processingPurpose').selectedOptions).map(el => el.value),
        dpiaJustification: document.getElementById('dpiaJustification').value,
        notSureDPIA: document.getElementById('notSureDPIA').checked
    };
    console.log('DPIA Step 1 Data:', formData);
    showDPIAStep2();
}

function showDPIAStep2() {
    document.getElementById('dpiaStep1').style.display = 'none';
    const step2Element = document.getElementById('dpiaStep2');
    step2Element.style.display = 'block';
    step2Element.innerHTML = `
        <h2>Step 2: Data Specifics and Risk Assessment</h2>
        <form id="dpiaStep2Form">
            <div class="form-section">
                <h3>1. What types of personal data are you handling?</h3>
                <p class="explanation">Select all that apply:</p>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="dataTypes" value="name"> Names</label>
                    <label><input type="checkbox" name="dataTypes" value="contact"> Contact details</label>
                    <label><input type="checkbox" name="dataTypes" value="financial"> Financial information</label>
                    <label><input type="checkbox" name="dataTypes" value="health"> Health data</label>
                    <label><input type="checkbox" name="dataTypes" value="location"> Location data</label>
                    <label><input type="checkbox" name="dataTypes" value="biometric"> Biometric data</label>
                    <label><input type="checkbox" name="dataTypes" value="other"> Other sensitive data</label>
                </div>
            </div>
            <div class="form-section">
                <h3>2. How many individuals' data will be processed?</h3>
                <select id="dataVolume" required>
                    <option value="">Please select...</option>
                    <option value="small">Less than 100</option>
                    <option value="medium">100 - 1,000</option>
                    <option value="large">1,000 - 10,000</option>
                    <option value="very_large">More than 10,000</option>
                </select>
            </div>
            <div class="form-section">
                <h3>3. What are the potential risks to individuals?</h3>
                <p class="explanation">Consider how your data processing might negatively impact people. Select all that apply:</p>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="risks" value="discrimination"> Discrimination</label>
                    <label><input type="checkbox" name="risks" value="financial_loss"> Financial loss</label>
                    <label><input type="checkbox" name="risks" value="reputation"> Damage to reputation</label>
                    <label><input type="checkbox" name="risks" value="physical_harm"> Physical harm</label>
                    <label><input type="checkbox" name="risks" value="loss_of_confidentiality"> Loss of confidentiality</label>
                    <label><input type="checkbox" name="risks" value="identity_theft"> Identity theft or fraud</label>
                </div>
            </div>
            <div class="form-section">
                <h3>4. What safeguards will you put in place?</h3>
                <p class="explanation">Describe the measures you'll take to protect the data and minimize risks:</p>
                <textarea id="safeguards" required></textarea>
            </div>
            <div class="form-section">
                <h3>5. Will you be sharing data with any third parties?</h3>
                <div>
                    <label><input type="radio" name="dataSharing" value="yes" required> Yes</label>
                    <label><input type="radio" name="dataSharing" value="no" required> No</label>
                </div>
                <div id="dataSharingDetails" style="display: none;">
                    <p>Please provide details about the third parties and why data needs to be shared:</p>
                    <textarea id="dataSharingExplanation"></textarea>
                </div>
            </div>
            <button type="submit">Continue to Next Step</button>
        </form>
    `;
    document.getElementById('dpiaStep2Form').onsubmit = handleStep2Submit;
    document.querySelectorAll('input[name="dataSharing"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('dataSharingDetails').style.display = 
                this.value === 'yes' ? 'block' : 'none';
        });
    });
}

function handleStep2Submit(e) {
    e.preventDefault();
    const formData = {
        dataTypes: Array.from(document.querySelectorAll('input[name="dataTypes"]:checked')).map(el => el.value),
        dataVolume: document.getElementById('dataVolume').value,
        risks: Array.from(document.querySelectorAll('input[name="risks"]:checked')).map(el => el.value),
        safeguards: document.getElementById('safeguards').value,
        dataSharing: document.querySelector('input[name="dataSharing"]:checked').value,
        dataSharingExplanation: document.getElementById('dataSharingExplanation').value
    };
    console.log('DPIA Step 2 Data:', formData);
    showDPIAStep3();
}

function showDPIAStep3() {
    document.getElementById('dpiaStep2').style.display = 'none';
    const step3Element = document.getElementById('dpiaStep3');
    step3Element.style.display = 'block';
    step3Element.innerHTML = `
        <h2>Step 3: Ensuring Compliance and Data Subject Rights</h2>
        <form id="dpiaStep3Form">
            <div class="form-section">
                <h3>1. How will you ensure data minimization?</h3>
                <p class="explanation">Describe how you'll collect and retain only the data necessary for your purposes:</p>
                <textarea id="dataMinimization" required></textarea>
            </div>
            <div class="form-section">
                <h3>2. How long will you retain the data?</h3>
                <select id="retentionPeriod" required>
                    <option value="">Please select...</option>
                    <option value="less_than_year">Less than 1 year</option>
                    <option value="1_to_3_years">1-3 years</option>
                    <option value="3_to_5_years">3-5 years</option>
                    <option value="5_to_10_years">5-10 years</option>
                    <option value="more_than_10_years">More than 10 years</option>
                    <option value="indefinitely">Indefinitely</option>
                </select>
                <p>Briefly explain the reason for this retention period:</p>
                <textarea id="retentionJustification" required></textarea>
            </div>
            <div class="form-section">
                <h3>3. How will you inform individuals about the processing?</h3>
                <p class="explanation">Select all methods you'll use:</p>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="informMethods" value="privacy_notice"> Privacy Notice on website</label>
                    <label><input type="checkbox" name="informMethods" value="email"> Email notification</label>
                    <label><input type="checkbox" name="informMethods" value="form"> Information on data collection form</label>
                    <label><input type="checkbox" name="informMethods" value="contract"> Within contract terms</label>
                    <label><input type="checkbox" name="informMethods" value="other"> Other method</label>
                </div>
                <div id="otherInformMethod" style="display: none;">
                    <p>Please specify the other method:</p>
                    <input type="text" id="otherInformMethodText">
                </div>
            </div>
            <div class="form-section">
                <h3>4. How will you support data subject rights?</h3>
                <p class="explanation">Describe your processes for handling the following rights:</p>
                <div>
                    <label>Right to access:</label>
                    <textarea name="subjectRights" required></textarea>
                </div>
                <div>
                    <label>Right to rectification:</label>
                    <textarea name="subjectRights" required></textarea>
