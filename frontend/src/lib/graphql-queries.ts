export const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        id
        email
        name
        role
        organization
        phone
        address
        city
        bio
        vehicleType
      }
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      user {
        id
        email
        name
        role
        organization
        phone
        address
        city
        bio
        vehicleType
      }
    }
  }
`;

export const ME_QUERY = `
  query Me {
    me {
      id
      email
      name
      role
      organization
      phone
      address
      city
      bio
      vehicleType
    }
  }
`;

export const PLATFORM_STATS_QUERY = `
  query PlatformStats {
    platformStats {
      totalDonations
      totalMealsRescued
      activeVolunteers
      communityPartners
    }
  }
`;

export const DONOR_STATS_QUERY = `
  query DonorStats {
    donorStats {
      totalDonations
      activeDonations
      completedDonations
      pendingRequests
      totalMealsSaved
    }
  }
`;

export const VOLUNTEER_STATS_QUERY = `
  query VolunteerStats {
    volunteerStats {
      availableTasks
      activeTasks
      completedPickups
      todayTasks
    }
  }
`;

export const RECEIVER_STATS_QUERY = `
  query ReceiverStats {
    receiverStats {
      availableFood
      pendingRequests
      activeDeliveries
      completedRequests
    }
  }
`;

export const GET_DONATIONS_QUERY = `
  query Donations($status: DonationStatus, $category: FoodCategory, $search: String) {
    donations(status: $status, category: $category, search: $search) {
      id
      foodName
      description
      category
      quantity
      unit
      pickupLocation
      pickupAvailableTime
      pickupDeadline
      expiryDeadline
      status
      storageNotes
      imageUrl
      donor {
        id
        name
        organization
        phone
      }
      currentRequest {
        id
        deliveryAddress
        status
        notes
        receiver {
          id
          name
          organization
          phone
        }
      }
      currentTask {
        id
        status
        volunteer {
          id
          name
          phone
          vehicleType
        }
      }
      createdAt
    }
  }
`;

export const GET_AVAILABLE_DONATIONS_QUERY = `
  query AvailableDonations {
    availableDonations {
      id
      foodName
      description
      category
      quantity
      unit
      pickupLocation
      pickupAvailableTime
      pickupDeadline
      expiryDeadline
      status
      storageNotes
      donor {
        id
        name
        organization
        phone
      }
      createdAt
    }
  }
`;

export const GET_MY_DONATIONS_QUERY = `
  query MyDonations {
    myDonations {
      id
      foodName
      description
      category
      quantity
      unit
      pickupLocation
      pickupAvailableTime
      pickupDeadline
      expiryDeadline
      status
      storageNotes
      currentRequest {
        id
        deliveryAddress
        status
        notes
        receiver {
          id
          name
          organization
          phone
        }
      }
      currentTask {
        id
        status
        volunteer {
          id
          name
          phone
          vehicleType
        }
      }
      createdAt
    }
  }
`;

export const GET_DONATION_DETAIL_QUERY = `
  query Donation($id: ID!) {
    donation(id: $id) {
      id
      foodName
      description
      category
      quantity
      unit
      pickupLocation
      pickupAvailableTime
      pickupDeadline
      expiryDeadline
      status
      storageNotes
      imageUrl
      donor {
        id
        name
        organization
        phone
        email
        address
      }
      requests {
        id
        deliveryAddress
        status
        notes
        receiver {
          id
          name
          organization
          phone
          email
        }
        createdAt
      }
      pickupTasks {
        id
        status
        pickedUpAt
        deliveredAt
        notes
        volunteer {
          id
          name
          phone
          vehicleType
          email
        }
        delivery {
          id
          recipientConfirmation
          confirmedAt
          proofNotes
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_DONATION_MUTATION = `
  mutation CreateDonation($input: CreateDonationInput!) {
    createDonation(input: $input) {
      id
      foodName
      status
      quantity
      unit
    }
  }
`;

export const UPDATE_DONATION_MUTATION = `
  mutation UpdateDonation($id: ID!, $input: UpdateDonationInput!) {
    updateDonation(id: $id, input: $input) {
      id
      foodName
      status
    }
  }
`;

export const CANCEL_DONATION_MUTATION = `
  mutation CancelDonation($id: ID!) {
    cancelDonation(id: $id) {
      id
      status
    }
  }
`;

export const REQUEST_DONATION_MUTATION = `
  mutation RequestDonation($input: CreateRequestInput!) {
    requestDonation(input: $input) {
      id
      donationId
      status
      deliveryAddress
    }
  }
`;

export const GET_MY_REQUESTS_QUERY = `
  query MyRequests {
    myRequests {
      id
      status
      deliveryAddress
      notes
      createdAt
      donation {
        id
        foodName
        category
        quantity
        unit
        pickupLocation
        pickupAvailableTime
        expiryDeadline
        status
        donor {
          id
          name
          organization
          phone
        }
        pickupTasks {
          id
          status
          volunteer {
            id
            name
            phone
            vehicleType
          }
        }
      }
    }
  }
`;

export const GET_REQUEST_DETAIL_QUERY = `
  query DonationRequest($id: ID!) {
    donationRequest(id: $id) {
      id
      status
      deliveryAddress
      notes
      createdAt
      receiver {
        id
        name
        organization
        phone
      }
      donation {
        id
        foodName
        description
        category
        quantity
        unit
        pickupLocation
        pickupAvailableTime
        expiryDeadline
        status
        storageNotes
        donor {
          id
          name
          organization
          phone
          email
        }
        pickupTasks {
          id
          status
          pickedUpAt
          deliveredAt
          volunteer {
            id
            name
            phone
            vehicleType
          }
          delivery {
            id
            recipientConfirmation
            confirmedAt
            proofNotes
          }
        }
      }
    }
  }
`;

export const CANCEL_REQUEST_MUTATION = `
  mutation CancelRequest($id: ID!) {
    cancelRequest(id: $id) {
      id
      status
    }
  }
`;

export const ACCEPT_REQUEST_MUTATION = `
  mutation AcceptRequest($requestId: ID!) {
    acceptRequest(requestId: $requestId) {
      id
      status
      deliveryAddress
      notes
      donation {
        id
        status
      }
    }
  }
`;

export const GET_AVAILABLE_PICKUP_TASKS_QUERY = `
  query AvailablePickupTasks {
    availablePickupTasks {
      id
      foodName
      description
      category
      quantity
      unit
      pickupLocation
      pickupAvailableTime
      pickupDeadline
      expiryDeadline
      status
      storageNotes
      donor {
        id
        name
        organization
        phone
        address
      }
      currentRequest {
        id
        deliveryAddress
        notes
        receiver {
          id
          name
          organization
          phone
        }
      }
      createdAt
    }
  }
`;

export const GET_MY_TASKS_QUERY = `
  query MyTasks {
    myTasks {
      id
      status
      pickedUpAt
      deliveredAt
      notes
      createdAt
      donation {
        id
        foodName
        category
        quantity
        unit
        pickupLocation
        pickupAvailableTime
        pickupDeadline
        expiryDeadline
        status
        storageNotes
        donor {
          id
          name
          organization
          phone
          address
        }
        requests {
          id
          deliveryAddress
          notes
          receiver {
            id
            name
            organization
            phone
          }
        }
      }
    }
  }
`;

export const GET_MY_TASK_HISTORY_QUERY = `
  query MyTaskHistory {
    myTaskHistory {
      id
      status
      pickedUpAt
      deliveredAt
      createdAt
      donation {
        id
        foodName
        category
        quantity
        unit
        pickupLocation
        status
        donor {
          id
          name
          organization
        }
        requests {
          id
          deliveryAddress
          receiver {
            id
            name
            organization
          }
        }
      }
    }
  }
`;

export const GET_TASK_DETAIL_QUERY = `
  query PickupTask($id: ID!) {
    pickupTask(id: $id) {
      id
      status
      pickedUpAt
      deliveredAt
      notes
      createdAt
      volunteer {
        id
        name
        phone
        vehicleType
      }
      donation {
        id
        foodName
        description
        category
        quantity
        unit
        pickupLocation
        pickupAvailableTime
        pickupDeadline
        expiryDeadline
        status
        storageNotes
        donor {
          id
          name
          organization
          phone
          address
        }
        requests {
          id
          deliveryAddress
          notes
          receiver {
            id
            name
            organization
            phone
          }
        }
      }
      delivery {
        id
        recipientConfirmation
        confirmedAt
        proofNotes
      }
    }
  }
`;

export const ACCEPT_PICKUP_MUTATION = `
  mutation AcceptPickup($donationId: ID!, $notes: String) {
    acceptPickup(donationId: $donationId, notes: $notes) {
      id
      status
    }
  }
`;

export const UPDATE_PICKUP_STATUS_MUTATION = `
  mutation UpdatePickupStatus($taskId: ID!, $status: PickupStatus!) {
    updatePickupStatus(taskId: $taskId, status: $status) {
      id
      status
      pickedUpAt
    }
  }
`;

export const CONFIRM_DELIVERY_MUTATION = `
  mutation ConfirmDelivery($taskId: ID!, $proofNotes: String) {
    confirmDelivery(taskId: $taskId, proofNotes: $proofNotes) {
      id
      status
      deliveredAt
    }
  }
`;

export const CONFIRM_RECEIPT_MUTATION = `
  mutation ConfirmReceipt($donationId: ID!, $notes: String) {
    confirmReceipt(donationId: $donationId, notes: $notes) {
      id
      status
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = `
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      name
      email
      phone
      organization
      address
      city
      bio
      vehicleType
    }
  }
`;
