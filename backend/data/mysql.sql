-- SQL Dump

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

--
-- Database : `mydb`
--

-- --------------------------------------------------------

--
-- Drop all table
--

DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `address`;
DROP TABLE IF EXISTS `country`;

-- --------------------------------------------------------

--
-- Structure of the table `country`
--
CREATE TABLE IF NOT EXISTS `country` (
  `cty_id` int NOT NULL,
  `cty_name` varchar(255) NOT NULL,
  `cty_iso_code_2` varchar(2) NOT NULL,
  `cty_iso_code_3` varchar(3) NOT NULL,
  `cty_status` enum('draft','online','delete') NOT NULL DEFAULT "draft"
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Structure of the table `account`
--
CREATE TABLE IF NOT EXISTS `account` (
  `act_id` int NOT NULL,
  `act_login` varchar(255),
  `act_password` varchar(255) NOT NULL,
  `act_email` varchar(255) NOT NULL,
  `act_role` enum('super-admin','admin','member') NOT NULL DEFAULT "member",
  `act_insert` datetime NOT NULL,
  `act_update` datetime NOT NULL,
  `act_status` enum('waiting','active','lock') NOT NULL DEFAULT "active"
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Structure of the table `address`
--
CREATE TABLE IF NOT EXISTS `address` (
  `add_id` int NOT NULL,
  `add_name` varchar(255) NOT NULL,
  `add_address` varchar(255) NOT NULL,
  `add_zipcode` varchar(255) NOT NULL,
  `add_city` varchar(255) NOT NULL,
  `cty_id` int NOT NULL,
  `add_category` enum('Personal','Familly','Job','Friend','Blocked') NOT NULL DEFAULT "Personal",
  `add_latitude` double(7, 5) NOT NULL,
  `add_longitude` double(8, 5) NOT NULL,
  `add_insert` datetime NOT NULL,
  `add_update` datetime NOT NULL,
  `add_status` enum('draft','online','delete') NOT NULL DEFAULT "draft"
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Index for dumped tables
--

--
-- Index of the table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`cty_id`),
  MODIFY `cty_id` int NOT NULL AUTO_INCREMENT,
  ADD UNIQUE KEY `cty_name` (`cty_name`),
  ADD UNIQUE KEY `cty_iso_code_2` (`cty_iso_code_2`),
  ADD UNIQUE KEY `cty_iso_code_3` (`cty_iso_code_3`);

--
-- Index of the table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`act_id`),
  MODIFY `act_id` int NOT NULL AUTO_INCREMENT,
  ADD KEY (`act_login`),
  ADD UNIQUE KEY `act_email` (`act_email`);

--
-- Index of the table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`add_id`),
  MODIFY `add_id` int NOT NULL AUTO_INCREMENT,
  ADD KEY (`add_name`),
  ADD KEY (`add_category`);

--
-- Constraints for dumped tables
--

--
-- Constraints of the table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`cty_id`) REFERENCES `country` (`cty_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Data for tables
--

--
-- Data of the table `country`
--
INSERT INTO `country` (`cty_id`, `cty_name`, `cty_iso_code_2`, `cty_iso_code_3`, `cty_status`) VALUES
(1, "Afghanistan", "AF", "AFG", "online"),
(2, "Albania", "AL", "ALB", "online"),
(3, "Algeria", "DZ", "DZA", "online"),
(4, "American Samoa", "AS", "ASM", "online"),
(5, "Andorra", "AD", "AND", "online"),
(6, "Angola", "AO", "AGO", "online"),
(7, "Anguilla", "AI", "AIA", "online"),
(8, "Antarctica", "AQ", "ATA", "online"),
(9, "Antigua and Barbuda", "AG", "ATG", "online"),
(10, "Argentina", "AR", "ARG", "online"),
(11, "Armenia", "AM", "ARM", "online"),
(12, "Aruba", "AW", "ABW", "online"),
(13, "Australia", "AU", "AUS", "online"),
(14, "Austria", "AT", "AUT", "online"),
(15, "Azerbaijan", "AZ", "AZE", "online"),
(16, "Bahamas", "BS", "BHS", "online"),
(17, "Bahrain", "BH", "BHR", "online"),
(18, "Bangladesh", "BD", "BGD", "online"),
(19, "Barbados", "BB", "BRB", "online"),
(20, "Belarus", "BY", "BLR", "online"),
(21, "Belgium", "BE", "BEL", "online"),
(22, "Belize", "BZ", "BLZ", "online"),
(23, "Benin", "BJ", "BEN", "online"),
(24, "Bermuda", "BM", "BMU", "online"),
(25, "Bhutan", "BT", "BTN", "online"),
(26, "Bolivia", "BO", "BOL", "online"),
(27, "Bosnia and Herzegowina", "BA", "BIH", "online"),
(28, "Botswana", "BW", "BWA", "online"),
(29, "Bouvet Island", "BV", "BVT", "online"),
(30, "Brazil", "BR", "BRA", "online"),
(31, "British Indian Ocean Territory", "IO", "IOT", "online"),
(32, "Brunei Darussalam", "BN", "BRN", "online"),
(33, "Bulgaria", "BG", "BGR", "online"),
(34, "Burkina Faso", "BF", "BFA", "online"),
(35, "Burundi", "BI", "BDI", "online"),
(36, "Cambodia", "KH", "KHM", "online"),
(37, "Cameroon", "CM", "CMR", "online"),
(38, "Canada", "CA", "CAN", "online"),
(39, "Cape Verde", "CV", "CPV", "online"),
(40, "Cayman Islands", "KY", "CYM", "online"),
(41, "Central African Republic", "CF", "CAF", "online"),
(42, "Chad", "TD", "TCD", "online"),
(43, "Chile", "CL", "CHL", "online"),
(44, "China", "CN", "CHN", "online"),
(45, "Christmas Island", "CX", "CXR", "online"),
(46, "Cocos {Keeling} Islands", "CC", "CCK", "online"),
(47, "Colombia", "CO", "COL", "online"),
(48, "Comoros", "KM", "COM", "online"),
(49, "Congo", "CG", "COG", "online"),
(50, "Cook Islands", "CK", "COK", "online"),
(51, "Costa Rica", "CR", "CRI", "online"),
(52, "Cote D'Ivoire", "CI", "CIV", "online"),
(53, "Croatia", "HR", "HRV", "online"),
(54, "Cuba", "CU", "CUB", "online"),
(55, "Cyprus", "CY", "CYP", "online"),
(56, "Czech Republic", "CZ", "CZE", "online"),
(57, "Denmark", "DK", "DNK", "online"),
(58, "Djibouti", "DJ", "DJI", "online"),
(59, "Dominica", "DM", "DMA", "online"),
(60, "Dominican Republic", "DO", "DOM", "online"),
(61, "East Timor", "TP", "TMP", "online"),
(62, "Ecuador", "EC", "ECU", "online"),
(63, "Egypt", "EG", "EGY", "online"),
(64, "El Salvador", "SV", "SLV", "online"),
(65, "Equatorial Guinea", "GQ", "GNQ", "online"),
(66, "Eritrea", "ER", "ERI", "online"),
(67, "Estonia", "EE", "EST", "online"),
(68, "Ethiopia", "ET", "ETH", "online"),
(69, "Falkland Islands {Malvinas}", "FK", "FLK", "online"),
(70, "Faroe Islands", "FO", "FRO", "online"),
(71, "Fiji", "FJ", "FJI", "online"),
(72, "Finland", "FI", "FIN", "online"),
(73, "France", "FR", "FRA", "online"),
(74, "France, Metropolitan", "FX", "FXX", "online"),
(75, "French Guiana", "GF", "GUF", "online"),
(76, "French Polynesia", "PF", "PYF", "online"),
(77, "French Southern Territories", "TF", "ATF", "online"),
(78, "Gabon", "GA", "GAB", "online"),
(79, "Gambia", "GM", "GMB", "online"),
(80, "Georgia", "GE", "GEO", "online"),
(81, "Germany", "DE", "DEU", "online"),
(82, "Ghana", "GH", "GHA", "online"),
(83, "Gibraltar", "GI", "GIB", "online"),
(84, "Greece", "GR", "GRC", "online"),
(85, "Greenland", "GL", "GRL", "online"),
(86, "Grenada", "GD", "GRD", "online"),
(87, "Guadeloupe", "GP", "GLP", "online"),
(88, "Guam", "GU", "GUM", "online"),
(89, "Guatemala", "GT", "GTM", "online"),
(90, "Guinea", "GN", "GIN", "online"),
(91, "Guinea-bissau", "GW", "GNB", "online"),
(92, "Guyana", "GY", "GUY", "online"),
(93, "Haiti", "HT", "HTI", "online"),
(94, "Heard and Mc Donald Islands", "HM", "HMD", "online"),
(95, "Honduras", "HN", "HND", "online"),
(96, "Hong Kong", "HK", "HKG", "online"),
(97, "Hungary", "HU", "HUN", "online"),
(98, "Iceland", "IS", "ISL", "online"),
(99, "India", "IN", "IND", "online"),
(100, "Indonesia", "ID", "IDN", "online"),
(101, "Iran {Islamic Republic of}", "IR", "IRN", "online"),
(102, "Iraq", "IQ", "IRQ", "online"),
(103, "Ireland", "IE", "IRL", "online"),
(104, "Israel", "IL", "ISR", "online"),
(105, "Italy", "IT", "ITA", "online"),
(106, "Jamaica", "JM", "JAM", "online"),
(107, "Japan", "JP", "JPN", "online"),
(108, "Jordan", "JO", "JOR", "online"),
(109, "Kazakhstan", "KZ", "KAZ", "online"),
(110, "Kenya", "KE", "KEN", "online"),
(111, "Kiribati", "KI", "KIR", "online"),
(112, "North Korea", "KP", "PRK", "online"),
(113, "Korea, Republic of", "KR", "KOR", "online"),
(114, "Kuwait", "KW", "KWT", "online"),
(115, "Kyrgyzstan", "KG", "KGZ", "online"),
(116, "Lao People's Democratic Republic", "LA", "LAO", "online"),
(117, "Latvia", "LV", "LVA", "online"),
(118, "Lebanon", "LB", "LBN", "online"),
(119, "Lesotho", "LS", "LSO", "online"),
(120, "Liberia", "LR", "LBR", "online"),
(121, "Libyan Arab Jamahiriya", "LY", "LBY", "online"),
(122, "Liechtenstein", "LI", "LIE", "online"),
(123, "Lithuania", "LT", "LTU", "online"),
(124, "Luxembourg", "LU", "LUX", "online"),
(125, "Macau", "MO", "MAC", "online"),
(126, "Macedonia", "MK", "MKD", "online"),
(127, "Madagascar", "MG", "MDG", "online"),
(128, "Malawi", "MW", "MWI", "online"),
(129, "Malaysia", "MY", "MYS", "online"),
(130, "Maldives", "MV", "MDV", "online"),
(131, "Mali", "ML", "MLI", "online"),
(132, "Malta", "MT", "MLT", "online"),
(133, "Marshall Islands", "MH", "MHL", "online"),
(134, "Martinique", "MQ", "MTQ", "online"),
(135, "Mauritania", "MR", "MRT", "online"),
(136, "Mauritius", "MU", "MUS", "online"),
(137, "Mayotte", "YT", "MYT", "online"),
(138, "Mexico", "MX", "MEX", "online"),
(139, "Micronesia, Federated States of", "FM", "FSM", "online"),
(140, "Moldova, Republic of", "MD", "MDA", "online"),
(141, "Monaco", "MC", "MCO", "online"),
(142, "Mongolia", "MN", "MNG", "online"),
(143, "Montserrat", "MS", "MSR", "online"),
(144, "Morocco", "MA", "MAR", "online"),
(145, "Mozambique", "MZ", "MOZ", "online"),
(146, "Myanmar", "MM", "MMR", "online"),
(147, "Namibia", "NA", "NAM", "online"),
(148, "Nauru", "NR", "NRU", "online"),
(149, "Nepal", "NP", "NPL", "online"),
(150, "Netherlands", "NL", "NLD", "online"),
(151, "Netherlands Antilles", "AN", "ANT", "online"),
(152, "New Caledonia", "NC", "NCL", "online"),
(153, "New Zealand", "NZ", "NZL", "online"),
(154, "Nicaragua", "NI", "NIC", "online"),
(155, "Niger", "NE", "NER", "online"),
(156, "Nigeria", "NG", "NGA", "online"),
(157, "Niue", "NU", "NIU", "online"),
(158, "Norfolk Island", "NF", "NFK", "online"),
(159, "Northern Mariana Islands", "MP", "MNP", "online"),
(160, "Norway", "NO", "NOR", "online"),
(161, "Oman", "OM", "OMN", "online"),
(162, "Pakistan", "PK", "PAK", "online"),
(163, "Palau", "PW", "PLW", "online"),
(164, "Panama", "PA", "PAN", "online"),
(165, "Papua New Guinea", "PG", "PNG", "online"),
(166, "Paraguay", "PY", "PRY", "online"),
(167, "Peru", "PE", "PER", "online"),
(168, "Philippines", "PH", "PHL", "online"),
(169, "Pitcairn", "PN", "PCN", "online"),
(170, "Poland", "PL", "POL", "online"),
(171, "Portugal", "PT", "PRT", "online"),
(172, "Puerto Rico", "PR", "PRI", "online"),
(173, "Qatar", "QA", "QAT", "online"),
(174, "Reunion", "RE", "REU", "online"),
(175, "Romania", "RO", "ROM", "online"),
(176, "Russian Federation", "RU", "RUS", "online"),
(177, "Rwanda", "RW", "RWA", "online"),
(178, "Saint Kitts and Nevis", "KN", "KNA", "online"),
(179, "Saint Lucia", "LC", "LCA", "online"),
(180, "Saint Vincent and the Grenadines", "VC", "VCT", "online"),
(181, "Samoa", "WS", "WSM", "online"),
(182, "San Marino", "SM", "SMR", "online"),
(183, "Sao Tome and Principe", "ST", "STP", "online"),
(184, "Saudi Arabia", "SA", "SAU", "online"),
(185, "Senegal", "SN", "SEN", "online"),
(186, "Seychelles", "SC", "SYC", "online"),
(187, "Sierra Leone", "SL", "SLE", "online"),
(188, "Singapore", "SG", "SGP", "online"),
(189, "Slovak Republic", "SK", "SVK", "online"),
(190, "Slovenia", "SI", "SVN", "online"),
(191, "Solomon Islands", "SB", "SLB", "online"),
(192, "Somalia", "SO", "SOM", "online"),
(193, "South Africa", "ZA", "ZAF", "online"),
(194, "South Georgia and the South Sandwich Islands", "GS", "SGS", "online"),
(195, "Spain", "ES", "ESP", "online"),
(196, "Sri Lanka", "LK", "LKA", "online"),
(197, "St. Helena", "SH", "SHN", "online"),
(198, "St. Pierre and Miquelon", "PM", "SPM", "online"),
(199, "Sudan", "SD", "SDN", "online"),
(200, "Suriname", "SR", "SUR", "online"),
(201, "Svalbard and Jan Mayen Islands", "SJ", "SJM", "online"),
(202, "Swaziland", "SZ", "SWZ", "online"),
(203, "Sweden", "SE", "SWE", "online"),
(204, "Switzerland", "CH", "CHE", "online"),
(205, "Syrian Arab Republic", "SY", "SYR", "online"),
(206, "Taiwan", "TW", "TWN", "online"),
(207, "Tajikistan", "TJ", "TJK", "online"),
(208, "Tanzania, United Republic of", "TZ", "TZA", "online"),
(209, "Thailand", "TH", "THA", "online"),
(210, "Togo", "TG", "TGO", "online"),
(211, "Tokelau", "TK", "TKL", "online"),
(212, "Tonga", "TO", "TON", "online"),
(213, "Trinidad and Tobago", "TT", "TTO", "online"),
(214, "Tunisia", "TN", "TUN", "online"),
(215, "Turkey", "TR", "TUR", "online"),
(216, "Turkmenistan", "TM", "TKM", "online"),
(217, "Turks and Caicos Islands", "TC", "TCA", "online"),
(218, "Tuvalu", "TV", "TUV", "online"),
(219, "Uganda", "UG", "UGA", "online"),
(220, "Ukraine", "UA", "UKR", "online"),
(221, "United Arab Emirates", "AE", "ARE", "online"),
(222, "United Kingdom", "GB", "GBR", "online"),
(223, "United States", "US", "USA", "online"),
(224, "United States Minor Outlying Islands", "UM", "UMI", "online"),
(225, "Uruguay", "UY", "URY", "online"),
(226, "Uzbekistan", "UZ", "UZB", "online"),
(227, "Vanuatu", "VU", "VUT", "online"),
(228, "Vatican City State {Holy See}", "VA", "VAT", "online"),
(229, "Venezuela", "VE", "VEN", "online"),
(230, "Viet Nam", "VN", "VNM", "online"),
(231, "Virgin Islands {British}", "VG", "VGB", "online"),
(232, "Virgin Islands {U.S.}", "VI", "VIR", "online"),
(233, "Wallis and Futuna Islands", "WF", "WLF", "online"),
(234, "Western Sahara", "EH", "ESH", "online"),
(235, "Yemen", "YE", "YEM", "online"),
(236, "Yugoslavia", "YU", "YUG", "online"),
(237, "Democratic Republic of Congo", "CD", "COD", "online"),
(238, "Zambia", "ZM", "ZMB", "online"),
(239, "Zimbabwe", "ZW", "ZWE", "online");

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
