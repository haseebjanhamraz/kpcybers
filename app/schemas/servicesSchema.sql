CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Features Table */
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    service_id INT NOT NULL,
    feature_name VARCHAR(255) NOT NULL,
    feature_description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Service Steps Table */
CREATE TABLE IF NOT EXISTS service_steps (
    id SERIAL PRIMARY KEY,
    service_id INT NOT NULL,
    step_number INT NOT NULL,
    step_title VARCHAR(255) NOT NULL,
    step_description TEXT NOT NULL,
    step_duration VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Service Plans Table */
CREATE TABLE IF NOT EXISTS service_plans (
    id SERIAL PRIMARY KEY,
    service_id INT NOT NULL,
    plan_name VARCHAR(255) NOT NULL,
    plan_description TEXT NOT NULL,
    plan_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Service Plan Features Table */
CREATE TABLE IF NOT EXISTS service_plan_features (
    id SERIAL PRIMARY KEY,
    service_plan_id INT NOT NULL,
    feature_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Service Case Studies Table */
CREATE TABLE IF NOT EXISTS service_case_studies (
    id SERIAL PRIMARY KEY,
    service_id INT NOT NULL,
    case_study_name VARCHAR(255) NOT NULL,
    case_study_description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Service Case Study Images Table */
CREATE TABLE IF NOT EXISTS service_case_study_images (
    id SERIAL PRIMARY KEY,
    service_case_study_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Add foreign key constraints */
ALTER TABLE features ADD CONSTRAINT fk_features_services FOREIGN KEY (service_id) REFERENCES services(id);
ALTER TABLE service_steps ADD CONSTRAINT fk_service_steps_services FOREIGN KEY (service_id) REFERENCES services(id);
ALTER TABLE service_plans ADD CONSTRAINT fk_service_plans_services FOREIGN KEY (service_id) REFERENCES services(id);
ALTER TABLE service_plan_features ADD CONSTRAINT fk_service_plan_features_service_plans FOREIGN KEY (service_plan_id) REFERENCES service_plans(id);
ALTER TABLE service_plan_features ADD CONSTRAINT fk_service_plan_features_features FOREIGN KEY (feature_id) REFERENCES features(id);
ALTER TABLE service_case_studies ADD CONSTRAINT fk_service_case_studies_services FOREIGN KEY (service_id) REFERENCES services(id);
ALTER TABLE service_case_study_images ADD CONSTRAINT fk_service_case_study_images_service_case_studies FOREIGN KEY (service_case_study_id) REFERENCES service_case_studies(id);

/* Add unique constraints */
ALTER TABLE services ADD CONSTRAINT uq_service_name UNIQUE (name);
ALTER TABLE features ADD CONSTRAINT uq_feature_name UNIQUE (service_id, feature_name);
ALTER TABLE service_steps ADD CONSTRAINT uq_service_step_title UNIQUE (service_id, step_title);
ALTER TABLE service_plans ADD CONSTRAINT uq_service_plan_name UNIQUE (service_id, plan_name);
ALTER TABLE service_case_studies ADD CONSTRAINT uq_service_case_study_name UNIQUE (service_id, case_study_name);

/* Indexes for faster queries */
CREATE INDEX idx_service_name ON services (name);
CREATE INDEX idx_features_service_id ON features (service_id);
CREATE INDEX idx_service_steps_service_id ON service_steps (service_id);
CREATE INDEX idx_service_plans_service_id ON service_plans (service_id);
CREATE INDEX idx_service_plan_features_service_plan_id ON service_plan_features (service_plan_id);
CREATE INDEX idx_service_plan_features_feature_id ON service_plan_features (feature_id);
CREATE INDEX idx_service_case_studies_service_id ON service_case_studies (service_id);
CREATE INDEX idx_service_case_study_images_service_case_study_id ON service_case_study_images (service_case_study_id);

/* Create trigger function for updated_at */
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/* Create triggers for each table */
CREATE TRIGGER update_services_timestamp
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_features_timestamp
BEFORE UPDATE ON features
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_service_steps_timestamp
BEFORE UPDATE ON service_steps
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_service_plans_timestamp
BEFORE UPDATE ON service_plans
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_service_plan_features_timestamp
BEFORE UPDATE ON service_plan_features
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_service_case_studies_timestamp
BEFORE UPDATE ON service_case_studies
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_service_case_study_images_timestamp
BEFORE UPDATE ON service_case_study_images
FOR EACH ROW EXECUTE FUNCTION update_timestamp();